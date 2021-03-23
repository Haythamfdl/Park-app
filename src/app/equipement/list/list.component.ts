import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {EquipementService} from '../../_services/equipement.service';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {Equipement} from '../../_model/equipement';
import {ComfirmDialogComponent} from '../../comfirm-dialog/comfirm-dialog.component';
import {MatDialog} from '@angular/material/dialog';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private fb: FormBuilder,
              private router: Router,
              private snackBar: MatSnackBar,
              public dialog: MatDialog,
              private equipementService: EquipementService) {
  }

  displayedColumns: string[] = ['numero', 'designation', 'agent', 'Action'];
  dataSource;
  equipement:Equipement;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.equipementService.getAllEquipements().subscribe(data =>{
      this.dataSource= new MatTableDataSource<Equipement>(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      panelClass: ['simple-snack-bar']
    });
  }

  openDialog(value :any){
    const dialogRef = this.dialog.open(ComfirmDialogComponent, {
      width: '400px',
      data: "Voulez-vous vraiment faire cette suppression ?"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result == true){
        this.supprimer(value);
        this.router.navigate(['/app/equipements']).then(() => {
          window.location.reload()
        });
        this.openSnackBar('Equipement a été Supprimer !','');
      }
    });
  }

  ajouter(){
    this.router.navigate(['/app/equipements/ajout']).then();
  }

  info(value :any){
    this.router.navigate(['/app/equipements/info/'+value]).then();
  }

  modifier(value: any){
    this.equipement = value;
    localStorage.setItem('Equipement', JSON.stringify(this.equipement));
    this.router.navigate(['/app/equipements/modifier']).then();
    console.log(this.equipement);
  }

  supprimer(value: any) {
    this.equipement = value;
    this.equipement.isdeleted = true;
    this.equipementService.update(this.equipement).subscribe();
  }


}
