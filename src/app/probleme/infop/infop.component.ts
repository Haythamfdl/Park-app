import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Agent} from '../../_model/agent';
import {Equipement} from '../../_model/equipement';
import {Probleme} from '../../_model/probleme';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ProblemeService} from '../../_services/probleme.service';

@Component({
  selector: 'app-infop',
  templateUrl: './infop.component.html',
  styleUrls: ['./infop.component.css']
})
export class InfopComponent implements OnInit {
  myForm: FormGroup;
  form: FormControl;
  probleme:Probleme;
  id:string;

  constructor(private fb: FormBuilder,
              private router: Router,
              private activatedRoute:ActivatedRoute,
              private snackBar: MatSnackBar,
              private problemeService:ProblemeService) {
    this.activatedRoute.params.subscribe(params => {this.id = params['id']});
    this.probleme=new Probleme();
  }

  ngOnInit(): void {
    this.probleme.agent=new Agent();
    this.probleme.equipement=new Equipement();
    this.problemeService.getProbleme(this.id).subscribe(data =>{
      this.probleme = data;
      if(this.probleme == null){
        this.router.navigate(['/app/problems']).then();
        this.openSnackBar('Le problème n\'éxiste pas !', '');
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
