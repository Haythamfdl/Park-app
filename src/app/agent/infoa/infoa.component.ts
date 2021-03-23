import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Equipement} from '../../_model/equipement';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {EquipementService} from '../../_services/equipement.service';
import {ComfirmDialogComponent} from '../../comfirm-dialog/comfirm-dialog.component';
import {Agent} from '../../_model/agent';
import {AgentService} from '../../_services/agent.service';

@Component({
  selector: 'app-infoa',
  templateUrl: './infoa.component.html',
  styleUrls: ['./infoa.component.css']
})
export class InfoaComponent implements OnInit {
  myForm: FormGroup;
  agent:Agent;
  num: string;
  constructor(private fb: FormBuilder,
              private router: Router,
              private activatedRoute:ActivatedRoute,
              private snackBar: MatSnackBar,
              public dialog: MatDialog,
              private agentService:AgentService) {
    this.activatedRoute.params.subscribe(params => {this.num = params['num']});
    this.agent=new Agent();
  }

  ngOnInit(): void {
    this.agentService.getAgentbyNum(this.num).subscribe(data =>{
      this.agent = data;
      if(this.agent == null){
        this.router.navigate(['/app/agents']).then();
        this.openSnackBar('Le numéro de l\'agent est invalide', '');
      }
      this.createForm();
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      panelClass: ['simple-snack-bar']
    });
  }

  createForm() {
    this.myForm = this.fb.group({
      idequip: [this.agent.idagent],
      numero: [this.agent.numero, [Validators.required]],
      nom: [this.agent.nom, [Validators.required]],
      email: [this.agent.email, [Validators.required, Validators.email]],
      tel:[this.agent.tel,[Validators.required]],
      departement:[this.agent.departement,[Validators.required]],
      fonction:[this.agent.fonction,[Validators.required]],
      isdeleted:[this.agent.isdeleted]
    });
  }
}
