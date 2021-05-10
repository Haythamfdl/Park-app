import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Utilisateur} from '../_model/utilisateur';
import {interval, Subscription} from 'rxjs';
import {MessageService} from '../_services/message.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: Utilisateur;
  subscription: Subscription;
  nb = '0';
  // délais entre chaque appelle (1000 = 1 seconde)
  timer = 5000;

  constructor(private router: Router,
              private snackBar: MatSnackBar,
              private messageService: MessageService) {
    this.subscription = interval(this.timer).subscribe((func => {
      this.messageService.getAllMessagesOuvertCount(this.user.iduser, false).subscribe(data => {
        this.nb = data;
      });
    }));
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('Utilisateur'));
    if (JSON.parse(localStorage.getItem('Utilisateur')) == null) {
      this.router.navigate(['/']).then();
    }
    this.messageService.getAllMessagesOuvertCount(this.user.iduser, false).subscribe(data => {
      this.nb = data;
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
    this.openSnackBar('Vous êtes déconnecter', '');
    this.router.navigate(['/']).then();
  }
}
