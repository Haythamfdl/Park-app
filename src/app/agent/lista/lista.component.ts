import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {ComfirmDialogComponent} from '../../comfirm-dialog/comfirm-dialog.component';
import {AgentService} from '../../_services/agent.service';
import {Agent} from '../../_model/agent';
import {Utilisateur} from '../../_model/utilisateur';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['numero', 'nom', 'departement', 'Action'];
  dataSource;
  agent: Agent;
  user: Utilisateur;
  permissionajout = false;
  permissionmodif = false;
  permissionsup = false;

  constructor(private fb: FormBuilder,
              private router: Router,
              private snackBar: MatSnackBar,
              public dialog: MatDialog,
              private agentService: AgentService) {
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('Utilisateur'));
    if (this.user == null) {
      this.router.navigate(['/']).then();
    }
    localStorage.removeItem('Equipement');
    localStorage.removeItem('Agent');
    this.agentService.getAllAgent().subscribe(data => {
      this.dataSource = new MatTableDataSource<Agent>(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
    this.permissionajout = this.user.permissions.some(i => {
      if (i.code === 'AJA') {
        return true;
      }
      return false;
    });
    this.permissionmodif = this.user.permissions.some(i => {
      if (i.code === 'MDA') {
        return true;
      }
      return false;
    });
    this.permissionsup = this.user.permissions.some(i => {
      if (i.code === 'SPA') {
        return true;
      }
      return false;
    });
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
        this.openSnackBar('Agent a été Supprimer !', '');
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ajouter() {
    this.router.navigate(['/app/agents/ajout']).then();
  }

  info(value: any) {
    this.router.navigate(['/app/agents/info/' + value]).then();
  }

  afficherEquipements(value: any) {
    this.router.navigate(['/app/agents/equipements/' + value]).then();
  }

  afficherProblemes(value: any) {
    this.router.navigate(['/app/agents/problemes/' + value]).then();
  }

  modifier(value: any) {
    this.agent = value;
    localStorage.setItem('Agent', JSON.stringify(this.agent));
    this.router.navigate(['/app/agents/modifier']).then();
  }

  supprimer(value: any) {
    this.agent = value;
    this.agent.isdeleted = true;
    this.agentService.update(this.agent).subscribe();
  }


}
