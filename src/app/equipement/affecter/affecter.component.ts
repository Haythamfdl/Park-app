import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Equipement} from '../../_model/equipement';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {EquipementService} from '../../_services/equipement.service';
import {Agent} from '../../_model/agent';
import {AgentService} from '../../_services/agent.service';
import {DatePipe} from '@angular/common';
import {Utilisateur} from '../../_model/utilisateur';
import {GlobalService} from '../../_services/global.service';

@Component({
  selector: 'app-affecter',
  templateUrl: './affecter.component.html',
  styleUrls: ['./affecter.component.css']
})
export class AffecterComponent implements OnInit {
  myForm: FormGroup;
  equipement: Equipement;
  agent: Agent;
  num;
  show = false;
  user: Utilisateur;

  constructor(private fb: FormBuilder,
              private router: Router,
              private snackBar: MatSnackBar,
              private datePipe: DatePipe,
              private equipementService: EquipementService,
              private agentService: AgentService,
              private globalService: GlobalService) {
    this.equipement = new Equipement();
    this.agent = new Agent();
  }

  get numero() {
    return this.myForm.get('numero');
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('Utilisateur'));
    if (this.user == null) {
      this.router.navigate(['/']).then();
    }
    const permission = this.globalService.checkPermission(this.user, '3');
    if (!permission){
      this.router.navigate(['/app/equipements']).then();
    }
    if (JSON.parse(localStorage.getItem('Equipement')) == null) {
      this.router.navigate(['/app/equipements']).then();
    }
    this.equipement = JSON.parse(localStorage.getItem('Equipement'));
    this.createForm();
  }

  recheche() {
    this.num = this.myForm.value.numero;
    this.agentService.getAgentbyNum(this.num).subscribe(data => {
      if (data !== null) {
        this.agent = data;
        this.show = true;
      } else {
        this.show = false;
        this.openSnackBar('Numéro invalide', '');
      }
    });
  }

  submit() {
    this.equipement.agent = this.agent;
    this.equipement.dateaffectation = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.equipementService.update(this.equipement).subscribe();
    this.router.navigate(['/app/equipements']).then();
    this.openSnackBar('L\'équipement a été affecter', '');
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      panelClass: ['simple-snack-bar']
    });
  }

  createForm() {
    this.myForm = this.fb.group({
      numero: [this.num]
    });
  }

}
