import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {ProblemeService} from '../../_services/probleme.service';
import {Probleme} from '../../_model/probleme';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {ComfirmDialogComponent} from '../../comfirm-dialog/comfirm-dialog.component';
import {Utilisateur} from '../../_model/utilisateur';

@Component({
  selector: 'app-listp-nr',
  templateUrl: './listp-nr.component.html',
  styleUrls: ['./listp-nr.component.css']
})
export class ListpNrComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['titre', 'type', 'agent', 'datesoumission', 'Action'];
  dataSource;
  probleme: Probleme;
  user: Utilisateur;
  permissionajout = false;
  permissionmodif = false;
  permissionsup = false;
  permissionresou = false;

  constructor(private fb: FormBuilder,
              private router: Router,
              private snackBar: MatSnackBar,
              public dialog: MatDialog,
              private problemeService: ProblemeService) {
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('Utilisateur'));
    if (this.user == null) {
      this.router.navigate(['/']).then();
    }
    localStorage.removeItem('Equipement');
    localStorage.removeItem('Agent');
    this.problemeService.getProblemesResolu(false).subscribe(data => {
      this.dataSource = new MatTableDataSource<Probleme>(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
    this.permissionajout = this.user.permissions.some(i => {
      if (i.code === 'AJP') {
        return true;
      }
      return false;
    });
    this.permissionmodif = this.user.permissions.some(i => {
      if (i.code === 'MDP') {
        return true;
      }
      return false;
    });
    this.permissionsup = this.user.permissions.some(i => {
      if (i.code === 'SPP') {
        return true;
      }
      return false;
    });
    this.permissionresou = this.user.permissions.some(i => {
      if (i.code === 'RSP') {
        return true;
      }
      return false;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      panelClass: ['simple-snack-bar']
    });
  }

  openDialog(value: any) {
    const dialogRef = this.dialog.open(ComfirmDialogComponent, {
      width: '400px',
      data: 'Voulez-vous vraiment faire cette suppression ?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.supprimer(value);
        window.location.reload();
        this.openSnackBar('Problemes a ??t?? Supprimer !', '');
      }
    });
  }

  ajouter() {
    this.router.navigate(['/app/problemes/ajout']).then();
  }

  info(value: any) {
    this.router.navigate(['/app/problemes/info/' + value]).then();
  }

  modifier(value: any) {
    this.probleme = value;
    localStorage.setItem('Probleme', JSON.stringify(this.probleme));
    this.router.navigate(['/app/problemes/modifier']).then();
  }

  solution(value: any) {
    this.probleme = value;
    localStorage.setItem('Probleme', JSON.stringify(this.probleme));
    this.router.navigate(['/app/solutions/probleme/' + this.probleme.idprob]).then();
  }

  resolu(value: any) {
    this.probleme = value;
    this.probleme.resolu = true;
    this.problemeService.update(this.probleme).subscribe();
    this.openSnackBar('Problemes a ??t?? R??solu !', '');
  }

  supprimer(value: any) {
    this.probleme = value;
    this.probleme.isdeleted = true;
    this.problemeService.update(this.probleme).subscribe();
  }
}

