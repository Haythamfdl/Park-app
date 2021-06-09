import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Equipement} from '../../_model/equipement';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {EquipementService} from '../../_services/equipement.service';
import {MatDialog} from '@angular/material/dialog';
import {ComfirmDialogComponent} from '../../comfirm-dialog/comfirm-dialog.component';
import {Utilisateur} from '../../_model/utilisateur';
import {GlobalService} from '../../_services/global.service';

@Component({
  selector: 'app-modifier',
  templateUrl: './modifier.component.html',
  styleUrls: ['./modifier.component.css']
})
export class ModifierComponent implements OnInit {
  myForm: FormGroup;
  equipement: Equipement;
  equipsave: Equipement;
  user: Utilisateur;


  constructor(private fb: FormBuilder,
              private router: Router,
              private snackBar: MatSnackBar,
              public dialog: MatDialog,
              private equipementService: EquipementService,
              private globalService: GlobalService) {
    this.equipement = new Equipement();
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('Utilisateur'));
    if (this.user == null) {
      this.router.navigate(['/']).then();
    }
    const permission = this.globalService.checkPermission(this.user, 'MDE');
    if (!permission){
      this.router.navigate(['/app/equipements']).then();
    }
    if (JSON.parse(localStorage.getItem('Equipement')) == null) {
      this.router.navigate(['/app/equipements']).then();
    }
    this.equipement = JSON.parse(localStorage.getItem('Equipement'));
    this.equipsave = this.equipement;
    this.createForm();
  }

  openDialog() {
    const dialogRef = this.dialog.open(ComfirmDialogComponent, {
      width: '400px',
      data: 'Voulez-vous vraiment faire cette modification ?'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.equipementService.update(this.equipement).subscribe();
        this.router.navigate(['/app/equipements']).then();
        this.openSnackBar('L\'équipement a été modifier', '');
      }
    });
  }

  submit(myForm) {
    this.equipement = myForm.value;
    this.equipement.idequip = this.equipsave.idequip;
    this.equipement.numero = this.equipsave.numero;
    this.equipement.isdeleted = false;
    this.equipement.dateaffectation = this.equipsave.dateaffectation;
    this.equipement.agent = this.equipsave.agent;
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
      idequip: [this.equipement.idequip],
      numero: [this.equipement.numero],
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
