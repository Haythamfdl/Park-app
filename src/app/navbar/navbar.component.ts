import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Utilisateur} from '../_model/utilisateur';
import {interval, Subscription} from 'rxjs';
import {MessageService} from '../_services/message.service';
import {UtilisateurService} from '../_services/utilisateur.service';
import {Tokens} from '../_model/tokens';
import {DEFAULT_INTERRUPTSOURCES, Idle} from '@ng-idle/core';
import {Keepalive} from '@ng-idle/keepalive';
import {TokenService} from '../_services/token.service';

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

  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = null;
  title = 'angular-idle-timeout';

  constructor(private router: Router,
              private snackBar: MatSnackBar,
              private utilisateurService: UtilisateurService,
              private messageService: MessageService,
              private tokenService: TokenService,
              private idle: Idle,
              private keepalive: Keepalive) {
    this.subscription = interval(this.timer).subscribe((func => {
      this.messageService.getMessageCount(this.user.iduser, false).subscribe(data => {
        this.nb = data;
        this.utilisateurService.getById(this.user.iduser).subscribe(datau => {
          this.user = datau;
          localStorage.setItem('Utilisateur', JSON.stringify(this.user));
        });
      });
    }));

    // sets an idle timeout
    idle.setIdle(3);
    // sets a timeout period
    idle.setTimeout(10);
    // sets the default interrupts
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    idle.onIdleEnd.subscribe(() => {
      this.idleState = 'No longer idle.';
      console.log(this.idleState);
      this.reset();
      this.token = JSON.parse(localStorage.getItem('Token'));
      this.tokenService.refreshToken(this.token).subscribe(ntoken => {
        localStorage.setItem('Token', JSON.stringify(ntoken));
        console.log('Token Updated');
      });
    });

    idle.onTimeout.subscribe(() => {
      this.idleState = 'Timed out!';
      this.timedOut = true;
      console.log(this.idleState);
      this.deconexion();
    });

    idle.onIdleStart.subscribe(() => {
      this.idleState = 'You\'ve gone idle!';
      console.log(this.idleState);
    });

    idle.onTimeoutWarning.subscribe((countdown) => {
      this.idleState = 'You will time out in ' + countdown + ' seconds!';
      console.log(this.idleState);
    });
    // sets the ping interval to 15 seconds
    keepalive.interval(9);
    keepalive.onPing.subscribe(() => this.lastPing = new Date());
    this.reset();
  }

  reset() {
    this.idle.watch();
    this.idleState = 'Started.';
    this.timedOut = false;
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
