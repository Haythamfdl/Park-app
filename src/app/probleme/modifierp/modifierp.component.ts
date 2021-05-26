import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Agent} from '../../_model/agent';
import {Equipement} from '../../_model/equipement';
import {Probleme} from '../../_model/probleme';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AgentService} from '../../_services/agent.service';
import {EquipementService} from '../../_services/equipement.service';
import {ProblemeService} from '../../_services/probleme.service';
import {ComfirmDialogComponent} from '../../comfirm-dialog/comfirm-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {Utilisateur} from '../../_model/utilisateur';

@Component({
  selector: 'app-modifierp',
  templateUrl: './modifierp.component.html',
  styleUrls: ['./modifierp.component.css']
})
export class ModifierpComponent implements OnInit {
  @ViewChild('numa') el1: ElementRef;
  @ViewChild('nume') el2: ElementRef;

  myForm: FormGroup;
  form: FormControl;
  agent: Agent;
  equipement: Equipement;
  showa = false;
  showe = false;
  showre = false;
  probleme: Probleme;
  problemsave: Probleme;
  types = [
    {value: 'Software', viewValue: 'Software'},
    {value: 'Hardware', viewValue: 'Hardware'},
    {value: 'Service', viewValue: 'Service'}
  ];
  user: Utilisateur;

  constructor(private fb: FormBuilder,
              private router: Router,
              private snackBar: MatSnackBar,
              public dialog: MatDialog,
              private agentService: AgentService,
              private equipementService: EquipementService,
              private problemeService: ProblemeService) {
    this.agent = new Agent();
    this.equipement = new Equipement();
    this.probleme = new Probleme();
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('Utilisateur'));
    if (this.user == null) {
      this.router.navigate(['/']).then();
    }
    const permission = this.checkPermission(this.user, '9');
    if (!permission){
      this.router.navigate(['/app/problemes']).then();
      this.openSnackBar('Vous n\'avez pas les permission nécessaire pour accéder a cette page !', '');
    }
    if (JSON.parse(localStorage.getItem('Probleme')) == null) {
      this.router.navigate(['/app/probleme']).then();
    }
    this.probleme = JSON.parse(localStorage.getItem('Probleme'));
    this.problemsave = this.probleme;
    this.chercherAgent(this.probleme.agent.numero);
    if (this.probleme.type === 'Hardware') {
      this.showre = true;
      this.chercherEquipement(this.probleme.equipement.numero);
    }
    this.createForm();
  }

  reset() {
    this.myForm.reset();
    this.showre = false;
    this.showa = false;
    this.showe = false;
    this.el1.nativeElement.value = '';
    this.el2.nativeElement.value = '';
  }

  openDialog() {
    const dialogRef = this.dialog.open(ComfirmDialogComponent, {
      width: '400px',
      data: 'Voulez-vous vraiment faire cette modification ?'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.problemeService.update(this.probleme).subscribe();
        this.openSnackBar('Le Problème a été modifier', '');
        this.router.navigate(['/app/problemes']).then();
      }
    });
  }

  submit(myForm) {
    this.probleme = myForm.value;
    this.probleme.idprob = this.problemsave.idprob;
    this.probleme.isdeleted = this.problemsave.isdeleted;
    this.probleme.resolu = this.problemsave.resolu;
    this.probleme.datesoumission = this.problemsave.datesoumission;
    this.openDialog();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      panelClass: ['simple-snack-bar']
    });
  }

  onChange() {
    this.showe = false;
    this.myForm.controls.equipement.setValue(null);
    if (this.myForm.value.type === 'Hardware') {
      this.showre = true;
    } else {
      this.showre = false;
    }
  }

  chercherAgent(num) {
    if (num === '') {
      num = null;
    }
    this.agentService.getAgentbyNum(num).subscribe(data => {
      if (data !== null) {
        this.agent = data;
        this.myForm.controls.agent.setValue(this.agent);
        this.showa = true;
      } else {
        this.showa = false;
        this.myForm.controls.agent.setValue(null);
        this.openSnackBar('Numéro l\'agent invalide', '');
      }
    });
  }

  chercherEquipement(num) {
    if (num === '') {
      num = null;
    }
    this.equipementService.getEquipementbyNum(num).subscribe(data => {
      if (data !== null) {
        this.equipement = data;
        this.myForm.controls.equipement.setValue(this.equipement);
        this.probleme.equipement = this.equipement;
        this.showe = true;
      } else {
        this.showe = false;
        this.myForm.controls.equipement.setValue(null);
        this.openSnackBar('Numéro de l\'équipement invalide', '');
      }
    });
  }

  createForm() {
    this.myForm = this.fb.group({
      idprob: [this.probleme.idprob],
      titre: [this.probleme.titre, [Validators.required]],
      probleme: [this.probleme.probleme, [Validators.required]],
      agent: [this.probleme.agent, [Validators.required]],
      type: [this.probleme.type, [Validators.required]],
      equipement: [this.probleme.equipement],
      datesoumission: [this.probleme.datesoumission],
      resolu: [this.probleme.resolu],
      isdeleted: [this.probleme.isdeleted]
    });
  }

  checkPermission(user: Utilisateur, idpermission: string): boolean{
    return user.permissions.some(i => {
      if (i.idpermission.toString() === idpermission) {
        return true;
      }
      return false;
    });
  }
}
