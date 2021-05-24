import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {ComfirmDialogComponent} from '../../comfirm-dialog/comfirm-dialog.component';
import {SolutionService} from '../../_services/solution.service';
import {Solution} from '../../_model/solution';
import {Utilisateur} from '../../_model/utilisateur';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['titre', 'utilisateur', 'datesoumission', 'Action'];
  dataSource;
  solution: Solution;
  idprob;
  user: Utilisateur;
  permissionajout = false;
  permissionmodif = false;
  permissionsup = false;

  constructor(private fb: FormBuilder,
              private router: Router,
              private snackBar: MatSnackBar,
              private activatedRoute: ActivatedRoute,
              public dialog: MatDialog,
              private solutionService: SolutionService) {
    this.activatedRoute.params.subscribe(params => {
      this.idprob = params.id;
    });
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('Utilisateur'));
    if (this.user == null) {
      this.router.navigate(['/']).then();
    }
    localStorage.removeItem('Equipement');
    localStorage.removeItem('Agent');
    this.solutionService.getSolutionsProblem(this.idprob).subscribe(data => {
      this.dataSource = new MatTableDataSource<Solution>(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
    this.permissionajout = this.user.permissions.some(i => {
      if (i.idpermission.toString() === '12') {
        return true;
      }
      return false;
    });
    this.permissionmodif = this.user.permissions.some(i => {
      if (i.idpermission.toString() === '13') {
        return true;
      }
      return false;
    });
    this.permissionsup = this.user.permissions.some(i => {
      if (i.idpermission.toString() === '14') {
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
        this.openSnackBar('Solution a été Supprimer !', '');
      }
    });
  }

  ajouter() {
    this.router.navigate(['/app/solutions/ajout']).then();
  }

  info(value: any) {
    this.router.navigate(['/app/solutions/info/' + value]).then();
  }

  modifier(value: any) {
    this.solution = value;
    localStorage.setItem('Solution', JSON.stringify(this.solution));
    this.router.navigate(['/app/solutions/modifier']).then();
  }

  supprimer(value: any) {
    this.solution = value;
    this.solution.isdeleted = true;
    this.solutionService.update(this.solution).subscribe();
  }
}
