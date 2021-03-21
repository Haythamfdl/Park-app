import { Component, OnInit } from '@angular/core';
import {Utilisateur} from '../_model/utilisateur';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  user: Utilisateur;
  constructor() { }

  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem('Utilisateur'));
  }

}
