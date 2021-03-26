import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Utilisateur} from '../_model/utilisateur';
import {interval, Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: Utilisateur;
  subscription:Subscription;
  num=0;

  constructor(private router: Router,
              private snackBar: MatSnackBar) {
    this.subscription = interval(1000).subscribe((func =>{

    }))
  }

  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem('Utilisateur'));
    if(JSON.parse(localStorage.getItem('Utilisateur')) == null)
      this.router.navigate(['/']).then();
  }


  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      panelClass: ['simple-snack-bar']
    });
  }

  deconexion(){
    localStorage.removeItem('Utilisateur');
    this.openSnackBar('Vous êtes déconnecter', '');
    this.router.navigate(['/']).then();
  }
}
