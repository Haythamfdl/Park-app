import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Utilisateur} from '../_model/utilisateur';
import {UtilisateurService} from '../_services/utilisateur.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  myForm: FormGroup;
  hide = true;
  user = new Utilisateur();
  constructor(private fb: FormBuilder,
              private router: Router,
              private utilisateurService: UtilisateurService) { }

  ngOnInit(): void {
    localStorage.removeItem('Utilisateur');
    this.createForm();
  }

  createForm() {
    this.myForm = this.fb.group({
      email: [this.user.email, [Validators.required, Validators.email]],
      pass: [this.user.pass, [Validators.required]]
    });
  }

  get email() { return this.myForm.get('email'); }
  get password() { return this.myForm.get('password'); }

  submit(myForm) {
    this.user = myForm.value;
    this.utilisateurService.login(this.user).subscribe(data => {
     this.user = data;
     this.alert();
    });
  }

  alert() {
    if (this.user == null) {
      this.user = new Utilisateur();
      alert('Email ou mots de passe incorrecte');
      localStorage.removeItem('Utilisateur');
    } else {
      localStorage.setItem('Utilisateur', JSON.stringify(this.user));
      alert('Vous êtes connecter');
    }
    //console.log(JSON.parse(localStorage.getItem('Utilisateur')));
  }

}
