import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Agent} from '../../_model/agent';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AgentService} from '../../_services/agent.service';
import {Equipement} from '../../_model/equipement';
import {Probleme} from '../../_model/probleme';
import {EquipementService} from '../../_services/equipement.service';
import {ProblemeService} from '../../_services/probleme.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-ajoutp',
  templateUrl: './ajoutp.component.html',
  styleUrls: ['./ajoutp.component.css']
})
export class AjoutpComponent implements OnInit {
  myForm: FormGroup;
  form: FormControl;
  agent:Agent;
  equipement:Equipement;
  showa=false;
  showe=false;
  showre=false;
  probleme:Probleme;
  types = [
    {value: 'Software', viewValue: 'Software'},
    {value: 'Hardware', viewValue: 'Hardware'},
    {value: 'Service', viewValue: 'Service'}
  ];

  @ViewChild('numa') el1:ElementRef;
  @ViewChild('nume') el2:ElementRef;

  constructor(private fb: FormBuilder,
              private router: Router,
              private snackBar: MatSnackBar,
              private datePipe:DatePipe,
              private agentService:AgentService,
              private equipementService:EquipementService,
              private problemeService:ProblemeService) {
    this.agent=new Agent();
    this.equipement=new Equipement();
    this.probleme=new Probleme();
  }

  ngOnInit(): void {
    this.createForm();
  }

  reset(){
    this.myForm.reset();
    this.showre=false;
    this.showa=false;
    this.showe=false;
    this.el1.nativeElement.value="";
    this.el2.nativeElement.value="";
    console.log(this.myForm.value);
  }

  submit(myForm) {
    this.probleme= myForm.value;
    this.probleme.isdeleted=false;
    this.probleme.resolu=false;
    this.probleme.datesoumission= this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.problemeService.save(this.probleme).subscribe();
    this.openSnackBar('Le Problème a été soumis', '');
    this.router.navigate(['/app/problemes']).then();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      panelClass: ['simple-snack-bar']
    });
  }

  onChange(){
    this.showe=false;
    this.myForm.controls['equipement'].setValue(null);
    if(this.myForm.value['type'] == "Hardware")
      this.showre=true;
    else
      this.showre=false;
    console.log(this.myForm.value);
  }

  chercherAgent(num){
    if(num == "")
      num=null;
    this.agentService.getAgentbyNum(num).subscribe(data =>{
      if(data !== null){
        this.agent =data;
        this.myForm.controls['agent'].setValue(this.agent);
        this.showa = true;
      }
      else {
        this.showa = false;
        this.myForm.controls['agent'].setValue(null);
        this.openSnackBar('Numéro l\'agent invalide', '');
      }
    });
  }

  chercherEquipement(num){
    if(num == "")
      num=null;
    this.equipementService.getEquipementbyNum(num).subscribe(data =>{
      if(data !== null){
        this.equipement =data;
        this.myForm.controls['equipement'].setValue(this.equipement);
        this.showe = true;
      }
      else {
        this.showe = false;
        this.myForm.controls['equipement'].setValue(null);
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
      type:[this.probleme.type,[Validators.required]],
      equipement:[this.probleme.equipement],
      datesoumission:[this.probleme.datesoumission],
      resolu:[this.probleme.resolu],
      isdeleted:[this.probleme.isdeleted]
    });
  }
}
