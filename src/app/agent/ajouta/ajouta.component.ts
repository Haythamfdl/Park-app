import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Agent} from '../../_model/agent';
import {AgentService} from '../../_services/agent.service';
import {Utilisateur} from '../../_model/utilisateur';
import {GlobalService} from '../../_services/global.service';

@Component({
  selector: 'app-ajouta',
  templateUrl: './ajouta.component.html',
  styleUrls: ['./ajouta.component.css']
})
export class AjoutaComponent implements OnInit {
  myForm: FormGroup;
  agent: Agent;
  user: Utilisateur;

  constructor(private fb: FormBuilder,
              private router: Router,
              private snackBar: MatSnackBar,
              private agentService: AgentService,
              private globalService: GlobalService) {
    this.agent = new Agent();
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('Utilisateur'));
    if (this.user == null) {
      this.router.navigate(['/']).then();
    }
    const permission = this.globalService.checkPermission(this.user, 'AJA');
    if (!permission){
      this.router.navigate(['/app/agents']).then();
    }
    this.createForm();
  }

  submit(myForm) {
    this.agent = myForm.value;
    this.agent.isdeleted = false;
    this.agentService.getAgentbyNum(this.agent.numero).subscribe(data => {
      if (data == null) {
        this.agentService.save(this.agent).subscribe();
        this.openSnackBar('L\'agent a été ajouter', '');
        this.router.navigate(['/app/agents']).then();
      } else {
        this.openSnackBar('Ce numéro est déja utiliser !', '');
      }
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
      tel: [this.agent.tel, [Validators.required]],
      departement: [this.agent.departement, [Validators.required]],
      fonction: [this.agent.fonction, [Validators.required]],
      isdeleted: [this.agent.isdeleted]
    });
  }
}
