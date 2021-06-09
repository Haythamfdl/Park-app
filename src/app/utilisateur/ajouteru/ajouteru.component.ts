import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Utilisateur} from '../../_model/utilisateur';
import {UtilisateurService} from '../../_services/utilisateur.service';
import {PermissionService} from '../../_services/permission.service';
import {Permission} from '../../_model/permission';
import {GlobalService} from '../../_services/global.service';

@Component({
  selector: 'app-ajouteru',
  templateUrl: './ajouteru.component.html',
  styleUrls: ['./ajouteru.component.css']
})
export class AjouteruComponent implements OnInit {
  myForm: FormGroup;
  utilisateur: Utilisateur;
  user: Utilisateur;
  permissions: Permission[];

  constructor(private fb: FormBuilder,
              private router: Router,
              private snackBar: MatSnackBar,
              private utilisateurService: UtilisateurService,
              private permissionService: PermissionService,
              private globalService: GlobalService) {
    this.utilisateur = new Utilisateur();
  }

  ngOnInit(): void {
    this.createForm();
    this.user = JSON.parse(localStorage.getItem('Utilisateur'));
    if (this.user == null) {
      this.router.navigate(['/']).then();
    }
    const permission = this.globalService.checkPermission(this.user, 'AJU');
    if (!permission){
      this.router.navigate(['/app/agents']).then();
    }
    this.permissionService.getAllPermissions().subscribe(data => {
      this.permissions = data;
    });
  }

  submit(myForm) {
    this.utilisateur = myForm.value;
    this.utilisateur.isdeleted = false;
    this.utilisateurService.getByEmail(this.utilisateur.email).subscribe(data => {
      if (data == null) {
        this.utilisateurService.save(this.utilisateur).subscribe();
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
      idequip: [this.utilisateur.iduser],
      nom: [this.utilisateur.nom, [Validators.required]],
      email: [this.utilisateur.email, [Validators.required, Validators.email]],
      pass: [this.utilisateur.pass, [Validators.required]],
      tel: [this.utilisateur.tel, [Validators.required]],
      datemodifpass: [this.utilisateur.datemodifpass],
      permissions: [this.utilisateur.permissions],
      isdeleted: [this.utilisateur.isdeleted]
    });
  }
}
