import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Utilisateur} from '../../_model/utilisateur';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {UtilisateurService} from '../../_services/utilisateur.service';
import {DatePipe} from '@angular/common';
import {ComfirmDialogComponent} from '../../comfirm-dialog/comfirm-dialog.component';
import {Tokens} from '../../_model/tokens';

@Component({
  selector: 'app-modifieru',
  templateUrl: './modifieru.component.html',
  styleUrls: ['./modifieru.component.css']
})
export class ModifieruComponent implements OnInit {
  @ViewChild('npass') el1: ElementRef;

  myForm: FormGroup;
  user: Utilisateur;
  usersave: Utilisateur;
  token: Tokens;

  constructor(private fb: FormBuilder,
              private router: Router,
              private snackBar: MatSnackBar,
              public dialog: MatDialog,
              private datePipe: DatePipe,
              private utilisateurService: UtilisateurService) {
    this.user = new Utilisateur();
  }

  ngOnInit(): void {
    if (JSON.parse(localStorage.getItem('Utilisateur')) == null) {
      this.router.navigate(['/']).then();
    }
    this.user = JSON.parse(localStorage.getItem('Utilisateur'));
    this.usersave = this.user;
    this.createForm();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      panelClass: ['simple-snack-bar']
    });
  }

  submit(myForm) {
    this.user = myForm.value;
    this.utilisateurService.authentification(this.usersave.email, this.user.pass).subscribe(data => {
      this.token = data;
      localStorage.setItem('Token', JSON.stringify(this.token));
      this.user.iduser = this.usersave.iduser;
      this.user.permissions = this.usersave.permissions;
      this.user.isdeleted = false;
      if (this.el1.nativeElement.value.trim() !== '') {
        this.user.pass = this.el1.nativeElement.value;
        this.user.datemodifpass = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
      }
      console.log(this.user);
      this.openDialog();
      },
        error => {
        this.openSnackBar('Mot de passe est incorrect !', '');
      });
  }

  openDialog() {
    const dialogRef = this.dialog.open(ComfirmDialogComponent, {
      width: '400px',
      data: 'Voulez-vous vraiment faire cette modification ?'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result === true) {
        this.utilisateurService.update(this.user).subscribe();
        this.user.pass = null;
        this.openSnackBar('Vos Données on été modifier', '');
        localStorage.setItem('Utilisateur', JSON.stringify(this.user));
        window.location.reload();
      }
    });
  }

  createForm() {
    this.myForm = this.fb.group({
      iduser: [this.user.iduser],
      nom: [this.user.nom, [Validators.required]],
      email: [this.user.email, [Validators.required, Validators.email]],
      tel: [this.user.tel, [Validators.required]],
      pass: [this.user.pass, [Validators.required]],
      datemodifpass: [this.user.datemodifpass],
      permissions: [this.user.permissions],
      isdeleted: [this.user.isdeleted]
    });
  }
}
