import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {EquipementService} from '../../_services/equipement.service';
import {Equipement} from '../../_model/equipement';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {ComfirmDialogComponent} from '../../comfirm-dialog/comfirm-dialog.component';
import {AgentService} from '../../_services/agent.service';
import {Agent} from '../../_model/agent';

@Component({
  selector: 'app-lista-equip',
  templateUrl: './lista-equip.component.html',
  styleUrls: ['./lista-equip.component.css']
})
export class ListaEquipComponent implements OnInit {

  displayedColumns: string[] = ['numero', 'designation', 'Action'];
  dataSource;
  equipement: Equipement;
  agent: Agent;
  num: string;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private fb: FormBuilder,
              private router: Router,
              private snackBar: MatSnackBar,
              private activatedRoute: ActivatedRoute,
              public dialog: MatDialog,
              private equipementService: EquipementService,
              private agentService: AgentService) {
    this.activatedRoute.params.subscribe(params => {
      this.num = params['num'];
    });
  }

  ngOnInit(): void {
    if (JSON.parse(localStorage.getItem('Utilisateur')) == null) {
      this.router.navigate(['/']).then();
    }
    localStorage.removeItem('Equipement');
    localStorage.removeItem('Agent');
    this.agentService.getAgentbyNum(this.num).subscribe(dataid => {
      this.agent = dataid;
      this.equipementService.getEquipmentsAgent(this.agent).subscribe(data => {
        this.dataSource = new MatTableDataSource<Equipement>(data);
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
        this.openSnackBar('Equipement a été Supprimer !', '');
      }
    });
  }

  info(value: any) {
    this.router.navigate(['/app/equipements/info/' + value]).then();
  }

  modifier(value: any) {
    this.equipement = value;
    localStorage.setItem('Equipement', JSON.stringify(this.equipement));
    this.router.navigate(['/app/equipements/modifier']).then();
  }

  affecter() {
    this.router.navigate(['/app/equipements']).then();
  }

  desaffecter(value: any) {
    this.equipement = value;
    this.equipement.agent = null;
    this.equipement.dateaffectation = null;
    this.equipementService.update(this.equipement).subscribe();
    window.location.reload();
    this.openSnackBar('Equipement a été Désaffecter !', '');
  }

  supprimer(value: any) {
    this.equipement = value;
    this.equipement.isdeleted = true;
    this.equipementService.update(this.equipement).subscribe();
  }

}
