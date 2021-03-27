import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {Utilisateur} from '../../_model/utilisateur';
import {UtilisateurService} from '../../_services/utilisateur.service';

@Component({
  selector: 'app-infou',
  templateUrl: './infou.component.html',
  styleUrls: ['./infou.component.css']
})
export class InfouComponent implements OnInit {
  myForm: FormGroup;
  user:Utilisateur;
  id: string;
  constructor(private fb: FormBuilder,
              private router: Router,
              private activatedRoute:ActivatedRoute,
              private snackBar: MatSnackBar,
              private dialog: MatDialog,
              private utilisateurService:UtilisateurService) {
    this.activatedRoute.params.subscribe(params => {this.id = params['id']});
    this.user=new Utilisateur();
  }

  ngOnInit(): void {
    if(JSON.parse(localStorage.getItem('Utilisateur')) == null)
      this.router.navigate(['/']).then();
    this.utilisateurService.getById(this.id).subscribe(data =>{
      this.user = data;
      if(this.user == null){
        this.router.navigate(['/app']).then();
        this.openSnackBar('Le numéro de cet utilisateur est invalide', '');
      }
      this.createForm();
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
      iduser: [this.user.iduser],
      nom: [this.user.nom, [Validators.required]],
      email: [this.user.email, [Validators.required, Validators.email]],
      tel:[this.user.tel,[Validators.required]],
      pass:[this.user.pass],
      datemodifpass:[this.user.datemodifpass],
      isdeleted:[this.user.isdeleted]
    });
  }

  afficher(){
    this.router.navigate(['/app/solutions/user/'+this.user.iduser]).then();
  }
}
