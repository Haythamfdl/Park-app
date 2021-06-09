import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Agent} from '../../_model/agent';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AgentService} from '../../_services/agent.service';
import {ComfirmDialogComponent} from '../../comfirm-dialog/comfirm-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {Utilisateur} from '../../_model/utilisateur';
import {GlobalService} from '../../_services/global.service';

@Component({
  selector: 'app-modifiera',
  templateUrl: './modifiera.component.html',
  styleUrls: ['./modifiera.component.css']
})
export class ModifieraComponent implements OnInit {
  myForm: FormGroup;
  agent: Agent;
  agentsave: Agent;
  user: Utilisateur;

  constructor(private fb: FormBuilder,
              private router: Router,
              private snackBar: MatSnackBar,
              public dialog: MatDialog,
              private agentService: AgentService,
              private globalService: GlobalService) {
    this.agent = new Agent();
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('Utilisateur'));
    if (this.user == null) {
      this.router.navigate(['/']).then();
    }
    const permission = this.globalService.checkPermission(this.user, 'MDA');
    if (!permission){
      this.router.navigate(['/app/agents']).then();
    }
    if (JSON.parse(localStorage.getItem('Agent')) == null) {
      this.router.navigate(['/app/agents']).then();
    }
    this.agent = JSON.parse(localStorage.getItem('Agent'));
    this.agentsave = this.agent;
    this.createForm();
  }

  openDialog() {
    const dialogRef = this.dialog.open(ComfirmDialogComponent, {
      width: '400px',
      data: 'Voulez-vous vraiment faire cette modification ?'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.agentService.update(this.agent).subscribe();
        this.openSnackBar('L\'agent a été modifier', '');
        this.router.navigate(['/app/agents']).then();
      }
    });
  }

  submit(myForm) {
    this.agent = myForm.value;
    this.agent.idagent = this.agentsave.idagent;
    this.agent.numero = this.agentsave.numero;
    this.agent.isdeleted = false;
    this.openDialog();
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
      numero: [this.agent.numero],
      nom: [this.agent.nom, [Validators.required]],
      email: [this.agent.email, [Validators.required, Validators.email]],
      tel: [this.agent.tel, [Validators.required]],
      departement: [this.agent.departement, [Validators.required]],
      fonction: [this.agent.fonction, [Validators.required]],
      isdeleted: [this.agent.isdeleted]
    });
  }
}
