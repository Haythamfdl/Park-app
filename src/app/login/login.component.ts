import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Utilisateur} from '../_model/utilisateur';
import {UtilisateurService} from '../_services/utilisateur.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Tokens} from '../_model/tokens';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  myForm: FormGroup;
  hide = true;
  user: Utilisateur;
  token: Tokens;

  constructor(private fb: FormBuilder,
              private router: Router,
              private snackBar: MatSnackBar,
              private utilisateurService: UtilisateurService) {
    this.user = new Utilisateur();
  }

  get email() {
    return this.myForm.get('email');
  }

  get password() {
    return this.myForm.get('password');
  }

  ngOnInit(): void {
    this.createForm();
    if (JSON.parse(localStorage.getItem('Utilisateur')) !== null) {
      this.router.navigate(['/app']).then();
    }
  }

  createForm() {
    this.myForm = this.fb.group({
      email: [this.user.email, [Validators.required, Validators.email]],
      pass: [this.user.pass, [Validators.required]]
    });
  }

  submit(myForm) {
    this.user = myForm.value;
    this.utilisateurService.authentification(this.user.email, this.user.pass).subscribe(token => {
        this.token = token;
        localStorage.setItem('Token', JSON.stringify(this.token));
        this.alert();
      },
      error => {
        this.user = new Utilisateur();
        this.openSnackBar('Email ou mots de passe incorrecte', '');
        localStorage.removeItem('Utilisateur');
      });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      panelClass: ['simple-snack-bar']
    });
  }

  alert() {
    this.utilisateurService.getByEmail(this.user.email).subscribe(data => {
      this.user = data;
      localStorage.setItem('Utilisateur', JSON.stringify(this.user));
      console.log(this.token);
      this.openSnackBar('Vous êtes connecter', '');
      this.router.navigate(['/app']).then();
    });
  }

}
