import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Message} from '../../_model/message';
import {Utilisateur} from '../../_model/utilisateur';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {DatePipe} from '@angular/common';
import {MessageService} from '../../_services/message.service';

@Component({
  selector: 'app-infom',
  templateUrl: './infom.component.html',
  styleUrls: ['./infom.component.css']
})
export class InfomComponent implements OnInit {
  myForm: FormGroup;
  showu = false;
  message: Message;
  envoyeur: Utilisateur;

  constructor(private fb: FormBuilder,
              private router: Router,
              private snackBar: MatSnackBar,
              private datePipe: DatePipe,
              private messageService: MessageService) {
  }

  ngOnInit(): void {
    if (JSON.parse(localStorage.getItem('Utilisateur')) == null) {
      this.router.navigate(['/']).then();
    }
    this.message = JSON.parse(localStorage.getItem('Message'));
    this.message.ouvert = true;

    this.messageService.update(this.message).subscribe();
    this.createForm();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      panelClass: ['simple-snack-bar']
    });
  }

  createForm() {
    this.myForm = this.fb.group({
      idmess: [this.message.idmess],
      sujet: [this.message.sujet],
      message: [this.message.message],
      envoyeur: [this.message.envoyeur],
      recepteur: [this.message.recepteur],
      dateenvoie: [this.message.dateenvoie],
      ouvert: [this.message.ouvert],
      isdeleted: [this.message.isdeleted]
    });
  }
}
