import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Solution} from '../../_model/solution';
import {Utilisateur} from '../../_model/utilisateur';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {SolutionService} from '../../_services/solution.service';

@Component({
  selector: 'app-infos',
  templateUrl: './infos.component.html',
  styleUrls: ['./infos.component.css']
})
export class InfosComponent implements OnInit {
  myForm: FormGroup;
  solution: Solution;
  idsol;

  constructor(private fb: FormBuilder,
              private router: Router,
              private snackBar: MatSnackBar,
              private activatedRoute: ActivatedRoute,
              public dialog: MatDialog,
              private solutionService: SolutionService) {
    this.solution = new Solution();
    this.activatedRoute.params.subscribe(params => {
      this.idsol = params.id;
    });
  }

  ngOnInit(): void {
    if (JSON.parse(localStorage.getItem('Utilisateur')) == null) {
      this.router.navigate(['/']).then();
    }
    this.solutionService.getSolution(this.idsol).subscribe(data => {
      this.solution = data;
      if (this.solution == null) {
        this.router.navigate(['/app/problemes']).then();
        this.openSnackBar('La Solution n\'éxiste pas !', '');
      }
      this.createForm();
    });
  }

  afficher() {
    this.router.navigate(['/app/solutions/user/' + this.solution.user.iduser]).then();
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

