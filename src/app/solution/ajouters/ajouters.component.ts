import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Solution} from '../../_model/solution';
import {Probleme} from '../../_model/probleme';
import {Utilisateur} from '../../_model/utilisateur';
import {SolutionService} from '../../_services/solution.service';
import {DatePipe} from '@angular/common';
import {GlobalService} from '../../_services/global.service';

@Component({
  selector: 'app-ajouters',
  templateUrl: './ajouters.component.html',
  styleUrls: ['./ajouters.component.css']
})
export class AjoutersComponent implements OnInit {
  myForm: FormGroup;
  solution: Solution;
  probleme: Probleme;
  utilisateur: Utilisateur;

  constructor(private fb: FormBuilder,
              private router: Router,
              private snackBar: MatSnackBar,
              private datePipe: DatePipe,
              private solutionService: SolutionService,
              private globalService: GlobalService) {
    this.solution = new Solution();
  }

  ngOnInit(): void {
    this.createForm();
    if (JSON.parse(localStorage.getItem('Probleme')) == null) {
      this.router.navigate(['/app/problemes']).then();
    } else {
      this.probleme = JSON.parse(localStorage.getItem('Probleme'));
    }
    if (JSON.parse(localStorage.getItem('Utilisateur')) == null) {
      this.router.navigate(['/']).then();
    } else {
      this.utilisateur = JSON.parse(localStorage.getItem('Utilisateur'));
    }
    const permission = this.globalService.checkPermission(this.utilisateur, '12');
    if (!permission){
      this.router.navigate(['/app/solutions/probleme/' + this.probleme.idprob]).then();
    }
  }

  submit(myForm) {
    this.solution = myForm.value;
    this.solution.isdeleted = false;
    this.solution.probleme = this.probleme;
    this.solution.user = this.utilisateur;
    this.solution.datesoumission = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.solutionService.save(this.solution).subscribe();
    this.openSnackBar('La Solution a été ajouter', '');
    this.router.navigate(['/app/solutions/probleme/' + this.probleme.idprob]).then();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      panelClass: ['simple-snack-bar']
    });
  }

  createForm() {
    this.myForm = this.fb.group({
      idsol: [this.solution.idsol],
      titre: [this.solution.titre, [Validators.required]],
      solution: [this.solution.solution, [Validators.required]],
      probleme: [this.solution.probleme],
      datesoumission: [this.solution.datesoumission],
      user: [this.solution.user],
      isdeleted: [this.solution.isdeleted]
    });
  }
}
