import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {EquipementService} from '../../_services/equipement.service';
import {ProblemeService} from '../../_services/probleme.service';
import {Probleme} from '../../_model/probleme';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {ComfirmDialogComponent} from '../../comfirm-dialog/comfirm-dialog.component';
import {Agent} from '../../_model/agent';
import {AgentService} from '../../_services/agent.service';

@Component({
  selector: 'app-lista-probleme',
  templateUrl: './lista-probleme.component.html',
  styleUrls: ['./lista-probleme.component.css']
})
export class ListaProblemeComponent implements OnInit {

  displayedColumns: string[] = ['titre', 'type', 'agent', 'datesoumission', 'resolu', 'Action'];
  dataSource;
  probleme: Probleme;
  agent: Agent;
  num;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private fb: FormBuilder,
              private router: Router,
              private snackBar: MatSnackBar,
              private activatedRoute: ActivatedRoute,
              public dialog: MatDialog,
              private equipementService: EquipementService,
              private problemeService: ProblemeService,
              private agentService: AgentService) {
    this.activatedRoute.params.subscribe(params => {
      this.num = params['num'];
    });
    this.agent = new Agent();
  }

  ngOnInit(): void {
    if (JSON.parse(localStorage.getItem('Utilisateur')) == null) {
      this.router.navigate(['/']).then();
    }
    localStorage.removeItem('Equipement');
    localStorage.removeItem('Agent');
    localStorage.removeItem('Probleme');
    this.agentService.getAgentbyNum(this.num).subscribe(data => {
      this.agent = data;
      if (this.agent == null) {
        this.router.navigate(['/app/agents']).then();
        this.openSnackBar('Le numéro de l\'agent est invalide', '');
      }
      this.problemeService.getProblemesAgent(this.agent).subscribe(data => {
        this.dataSource = new MatTableDataSource<Probleme>(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
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
      console.log(result);
      if (result == true) {
        this.supprimer(value);
        window.location.reload();
        this.openSnackBar('Problemes a été Supprimer !', '');
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
    this.router.navigate(['/app/solutions/' + this.probleme.idprob]).then();
  }

  supprimer(value: any) {
    this.probleme = value;
    this.probleme.isdeleted = true;
    this.problemeService.update(this.probleme).subscribe();
  }
}
