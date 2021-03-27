import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Equipement} from '../../_model/equipement';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {EquipementService} from '../../_services/equipement.service';
import {Agent} from '../../_model/agent';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  myForm: FormGroup;
  equipement: Equipement;
  agent = 'Aucun';
  num: string;

  constructor(private fb: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private snackBar: MatSnackBar,
              private equipementService: EquipementService) {
    this.activatedRoute.params.subscribe(params => {
      this.num = params['num'];
    });
    this.equipement = new Equipement();
  }

  ngOnInit(): void {
    if (JSON.parse(localStorage.getItem('Utilisateur')) == null) {
      this.router.navigate(['/']).then();
    }
    this.equipement.agent = new Agent();
    this.equipementService.getEquipementbyNum(this.num).subscribe(data => {
      this.equipement = data;
      if (this.equipement == null) {
        this.router.navigate(['/app/equipements']).then();
        this.openSnackBar('Le numéro de l\'équipement est invalide', '');
      }
      if (this.equipement.agent !== null) {
        this.agent = this.equipement.agent.nom + ' (' + this.equipement.agent.numero + ')';
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
      idequip: [this.equipement.idequip],
      numero: [this.equipement.numero],
      designation: [this.equipement.designation],
      fabriquant: [this.equipement.fabriquant],
      dateaquisition: [this.equipement.dateaquisition],
      dateservice: [this.equipement.dateservice],
      valeuraquisition: [this.equipement.valeuraquisition],
      dureegarantie: [this.equipement.dureegarantie],
      poids: [this.equipement.poids],
      taille: [this.equipement.taille],
      dateaffectation: [this.equipement.dateaffectation],
      isdeleted: [this.equipement.isdeleted],
    });
  }
}
