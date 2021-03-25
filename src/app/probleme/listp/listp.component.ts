import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {EquipementService} from '../../_services/equipement.service';
import {Equipement} from '../../_model/equipement';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {ComfirmDialogComponent} from '../../comfirm-dialog/comfirm-dialog.component';
import {ProblemeService} from '../../_services/probleme.service';
import {Probleme} from '../../_model/probleme';

@Component({
  selector: 'app-listp',
  templateUrl: './listp.component.html',
  styleUrls: ['./listp.component.css']
})
export class ListpComponent implements OnInit {

  constructor(private fb: FormBuilder,
              private router: Router,
              private snackBar: MatSnackBar,
              public dialog: MatDialog,
              private equipementService: EquipementService,
              private problemeService:ProblemeService) {
  }

  displayedColumns: string[] = ['titre', 'type', 'agent', 'datesoumission' ,'resolu' , 'Action'];
  dataSource;
  probleme:Probleme;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    if(JSON.parse(localStorage.getItem('Utilisateur')) == null)
      this.router.navigate(['/']).then();
    localStorage.removeItem('Equipement');
    localStorage.removeItem('Agent');
    this.problemeService.getAllProblemes().subscribe(data =>{
      this.dataSource= new MatTableDataSource<Probleme>(data);
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
        window.location.reload();
        this.openSnackBar('Problemes a été Supprimer !','');
      }
    });
  }

  ajouter(){
    this.router.navigate(['/app/problemes/ajout']).then();
  }

  info(value :any){
    this.router.navigate(['/app/problemes/info/'+value]).then();
  }

  modifier(value: any){
    this.probleme = value;
    localStorage.setItem('Probleme', JSON.stringify(this.probleme));
    this.router.navigate(['/app/problemes/modifier']).then();
  }

  solution(value: any){
    this.probleme = value;
    this.router.navigate(['/app/solutions/'+this.probleme.idprob]).then();
  }

  supprimer(value: any) {
    this.probleme = value;
    this.probleme.isdeleted = true;
    this.problemeService.update(this.probleme).subscribe();
  }
}
