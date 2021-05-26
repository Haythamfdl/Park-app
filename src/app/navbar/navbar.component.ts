import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Utilisateur} from '../_model/utilisateur';
import {interval, Subscription} from 'rxjs';
import {MessageService} from '../_services/message.service';
import {UtilisateurService} from '../_services/utilisateur.service';
import {Tokens} from '../_model/tokens';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  user: Utilisateur;
  subscription: Subscription;
  nb = '0';
  // délais entre chaque appelle des messages (1000 = 1 seconde)
  timer = 5000;
  permissionajout = false;
  token: Tokens;

  constructor(private router: Router,
              private snackBar: MatSnackBar,
              private utilisateurService: UtilisateurService,
              private messageService: MessageService) {
    this.subscription = interval(this.timer).subscribe((func => {
      this.messageService.getMessageCount(this.user.iduser, false).subscribe(data => {
        this.nb = data;
        this.utilisateurService.getById(this.user.iduser).subscribe(datau => {
          this.user = datau;
          localStorage.setItem('Utilisateur', JSON.stringify(this.user));
        });
      });
    }));
  }

  ngOnDestroy() {
    localStorage.removeItem('Utilisateur');
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.token = JSON.parse(localStorage.getItem('Token'));
    this.user = JSON.parse(localStorage.getItem('Utilisateur'));
    if (JSON.parse(localStorage.getItem('Utilisateur')) == null) {
      this.router.navigate(['/']).then();
    }
    this.messageService.getMessageCount(this.user.iduser, false).subscribe(data => {
      this.nb = data;
    });
    this.permissionajout = this.user.permissions.some(i => {
      if (i.idpermission.toString() === '15') {
        return true;
      }
      return false;
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      panelClass: ['simple-snack-bar']
    });
  }

  deconexion() {
    localStorage.removeItem('Utilisateur');
    localStorage.removeItem('Token');
    this.openSnackBar('Vous êtes déconnecter', '');
    this.router.navigate(['/']).then();
  }
}
