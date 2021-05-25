import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Utilisateur} from '../../_model/utilisateur';
import {UtilisateurService} from '../../_services/utilisateur.service';
import {PermissionService} from '../../_services/permission.service';
import {Permission} from '../../_model/permission';

@Component({
  selector: 'app-ajouteru',
  templateUrl: './ajouteru.component.html',
  styleUrls: ['./ajouteru.component.css']
})
export class AjouteruComponent implements OnInit {
  myForm: FormGroup;
  user: Utilisateur;
  permissions: Permission[];

  constructor(private fb: FormBuilder,
              private router: Router,
              private snackBar: MatSnackBar,
              private utilisateurService: UtilisateurService,
              private permissionService: PermissionService) {
    this.user = new Utilisateur();
  }

  ngOnInit(): void {
    this.createForm();
    if (JSON.parse(localStorage.getItem('Utilisateur')) == null) {
      this.router.navigate(['/']).then();
    }
    this.permissionService.getAllPermissions().subscribe(data => {
      this.permissions = data;
      console.log(this.permissions);
    });
  }

  submit(myForm) {
    this.user = myForm.value;
    this.user.isdeleted = false;
    this.utilisateurService.getByEmail(this.user.email).subscribe(data => {
      if (data == null) {
        this.utilisateurService.save(this.user).subscribe();
        this.openSnackBar('L\'utilisateur a été ajouter', '');
        this.router.navigate(['/app']).then();
      } else {
        this.openSnackBar('Cet email est déja utiliser !', '');
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      panelClass: ['simple-snack-bar']
    });
  }

  createForm() {
    this.myForm = this.fb.group({
      idequip: [this.user.iduser],
      nom: [this.user.nom, [Validators.required]],
      email: [this.user.email, [Validators.required, Validators.email]],
      pass: [this.user.pass, [Validators.required]],
      tel: [this.user.tel, [Validators.required]],
      datemodifpass: [this.user.datemodifpass],
      permissions: [this.user.permissions],
      isdeleted: [this.user.isdeleted]
    });
  }
}
