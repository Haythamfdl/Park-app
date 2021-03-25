import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Solution} from '../../_model/solution';
import {Probleme} from '../../_model/probleme';
import {Utilisateur} from '../../_model/utilisateur';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {DatePipe} from '@angular/common';
import {SolutionService} from '../../_services/solution.service';
import {MatDialog} from '@angular/material/dialog';
import {ComfirmDialogComponent} from '../../comfirm-dialog/comfirm-dialog.component';

@Component({
  selector: 'app-modifiers',
  templateUrl: './modifiers.component.html',
  styleUrls: ['./modifiers.component.css']
})
export class ModifiersComponent implements OnInit {
  myForm: FormGroup;
  solution:Solution;
  probleme:Probleme;
  utilisateur:Utilisateur;
  solutionsave:Solution;
  constructor(private fb: FormBuilder,
              private router: Router,
              private snackBar: MatSnackBar,
              public dialog: MatDialog,
              private datePipe:DatePipe,
              private solutionService:SolutionService) {
    this.solution=new Solution();
  }

  ngOnInit(): void {
    if(JSON.parse(localStorage.getItem('Probleme')) == null)
      this.router.navigate(['/app/problemes']).then();
    else
      this.probleme = JSON.parse(localStorage.getItem('Probleme'));

    if(JSON.parse(localStorage.getItem('Utilisateur')) == null)
      this.router.navigate(['/']).then();
    else
      this.utilisateur = JSON.parse(localStorage.getItem('Utilisateur'));

    if(JSON.parse(localStorage.getItem('Solution')) == null)
      this.router.navigate(['/app/solutions/probleme/'+this.probleme.idprob]).then();
    else {
      this.solution = JSON.parse(localStorage.getItem('Solution'));
      this.solutionsave=this.solution;
    }
    this.createForm();
  }

  submit(myForm) {
    this.solution= myForm.value;
    this.solution.idsol=this.solutionsave.idsol;
    this.solution.isdeleted=this.solutionsave.isdeleted;
    this.solution.probleme=this.solutionsave.probleme;
    this.solution.user=this.solutionsave.user;
    this.solution.datesoumission=this.solutionsave.datesoumission;
    this.openDialog();
  }

  openDialog(){
    const dialogRef = this.dialog.open(ComfirmDialogComponent, {
      width: '400px',
      data: "Voulez-vous vraiment faire cette modification ?"
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result == true){
        this.solutionService.update(this.solution).subscribe();
        this.openSnackBar('Le Solution a été modifier', '');
        this.router.navigate(['/app/solutions/probleme/'+this.probleme.idprob]).then();
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
      idsol: [this.solution.idsol],
      titre: [this.solution.titre, [Validators.required]],
      solution: [this.solution.solution, [Validators.required]],
      probleme: [this.solution.probleme],
      datesoumission:[this.solution.datesoumission],
      user:[this.solution.user],
      isdeleted:[this.solution.isdeleted]
    });
  }
}
