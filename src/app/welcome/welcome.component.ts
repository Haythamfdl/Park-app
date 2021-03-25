import {Component, OnInit} from '@angular/core';
import {Utilisateur} from '../_model/utilisateur';
import {Router} from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  user: Utilisateur;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem('Utilisateur'));
    if(JSON.parse(localStorage.getItem('Utilisateur')) == null)
      this.router.navigate(['/']).then();
  }

}
