import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {DatePipe} from '@angular/common';
import {Message} from '../../_model/message';
import {Utilisateur} from '../../_model/utilisateur';
import {UtilisateurService} from '../../_services/utilisateur.service';
import {MessageService} from '../../_services/message.service';

@Component({
  selector: 'app-envoyerm',
  templateUrl: './envoyerm.component.html',
  styleUrls: ['./envoyerm.component.css']
})
export class EnvoyermComponent implements OnInit {
  myForm: FormGroup;
  showu = false;
  message: Message;
  envoyeur: Utilisateur;
  recepteur: Utilisateur;

  @ViewChild('email') el1: ElementRef;

  constructor(private fb: FormBuilder,
              private router: Router,
              private snackBar: MatSnackBar,
              private datePipe: DatePipe,
              private utilisateurService: UtilisateurService,
              private messageService: MessageService) {
    this.message = new Message();
  }

  ngOnInit(): void {
    this.envoyeur = JSON.parse(localStorage.getItem('Utilisateur'));
    if (this.envoyeur == null) {
      this.router.navigate(['/']).then();
    }
    this.createForm();
  }

  reset() {
    this.myForm.reset();
    this.showu = false;
    this.el1.nativeElement.value = '';
  }

  submit(myForm) {
    this.message = myForm.value;
    this.message.isdeleted = false;
    this.message.ouvert = false;
    this.message.envoyeur = this.envoyeur;
    this.message.dateenvoie = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.messageService.save(this.message).subscribe();
    this.openSnackBar('Message Envoyer', '');
    this.router.navigate(['/app/messages']).then();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      panelClass: ['simple-snack-bar']
    });
  }

  chercherUser(email) {
    if (email == '') {
      email = null;
    }
    this.utilisateurService.getByEmail(email).subscribe(data => {
      if (data !== null) {
        this.recepteur = data;
        this.myForm.controls['recepteur'].setValue(this.recepteur);
        this.showu = true;
      } else {
        this.showu = false;
        this.myForm.controls['recepteur'].setValue(null);
        this.openSnackBar('Email invalide', '');
      }
    });
  }

  createForm() {
    this.myForm = this.fb.group({
      idmess: [this.message.idmess],
      sujet: [this.message.sujet, [Validators.required]],
      message: [this.message.message, [Validators.required]],
      envoyeur: [this.message.envoyeur],
      recepteur: [this.message.recepteur, [Validators.required]],
      dateenvoie: [this.message.dateenvoie],
      ouvert: [this.message.ouvert],
      isdeleted: [this.message.isdeleted]
    });
  }
}
