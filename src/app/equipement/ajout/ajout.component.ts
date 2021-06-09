import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Equipement} from '../../_model/equipement';
import {EquipementService} from '../../_services/equipement.service';
import {Utilisateur} from '../../_model/utilisateur';
import {GlobalService} from '../../_services/global.service';

@Component({
  selector: 'app-ajout',
  templateUrl: './ajout.component.html',
  styleUrls: ['./ajout.component.css']
})
export class AjoutComponent implements OnInit {
  myForm: FormGroup;
  equipement: Equipement;
  user: Utilisateur;

  constructor(private fb: FormBuilder,
              private router: Router,
              private snackBar: MatSnackBar,
              private equipementService: EquipementService,
              private globalService: GlobalService) {
    this.equipement = new Equipement();
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('Utilisateur'));
    if (this.user == null) {
      this.router.navigate(['/']).then();
    }
    const permission = this.globalService.checkPermission(this.user, 'AJE');
    if (!permission){
      this.router.navigate(['/app/equipements']).then();
    }
    this.createForm();
  }

  submit(myForm) {
    this.equipement = myForm.value;
    this.equipement.isdeleted = false;
    this.equipementService.getEquipementbyNum(this.equipement.numero).subscribe(data => {
      if (data == null) {
        this.equipementService.save(this.equipement).subscribe();
        this.openSnackBar('L\'équipement a été ajouter', '');
        this.router.navigate(['/app/equipements']).then();
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
      idequip: [this.equipement.idequip],
      numero: [this.equipement.numero, [Validators.required]],
      designation: [this.equipement.designation, [Validators.required]],
      fabriquant: [this.equipement.fabriquant, [Validators.required]],
      dateaquisition: [this.equipement.dateaquisition, [Validators.required]],
      dateservice: [this.equipement.dateservice, [Validators.required]],
      valeuraquisition: [this.equipement.valeuraquisition, [Validators.required]],
      dureegarantie: [this.equipement.dureegarantie, [Validators.required]],
      poids: [this.equipement.poids, [Validators.required]],
      taille: [this.equipement.taille, [Validators.required]],
      dateaffectation: [this.equipement.dateaffectation],
      isdeleted: [this.equipement.isdeleted],
      agent: [this.equipement.agent]
    });
  }
}
