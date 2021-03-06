import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {ComfirmDialogComponent} from '../../comfirm-dialog/comfirm-dialog.component';
import {Message} from '../../_model/message';
import {MessageService} from '../../_services/message.service';
import {Utilisateur} from '../../_model/utilisateur';

@Component({
  selector: 'app-listm',
  templateUrl: './listm.component.html',
  styleUrls: ['./listm.component.css']
})
export class ListmComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['user', 'sujet', 'dateenvoie', 'lu', 'Action'];
  dataSource;
  message: Message;
  user: Utilisateur;


  constructor(private fb: FormBuilder,
              private router: Router,
              private snackBar: MatSnackBar,
              public dialog: MatDialog,
              private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('Utilisateur'));
    if (this.user == null) {
      this.router.navigate(['/']).then();
    }
    localStorage.removeItem('Equipement');
    localStorage.removeItem('Agent');
    this.messageService.getAllMessage(this.user.iduser).subscribe(data => {
      this.dataSource = new MatTableDataSource<Message>(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
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
        this.openSnackBar('Message a ??t?? Supprimer !', '');
      }
    });
  }

  ajouter() {
    this.router.navigate(['/app/messages/envoyer']).then();
  }

  info(value: any) {
    this.message = value;
    localStorage.setItem('Message', JSON.stringify(this.message));
    this.router.navigate(['/app/messages/info']).then();
  }

  supprimer(value: any) {
    this.message = value;
    this.message.isdeleted = true;
    this.messageService.update(this.message).subscribe();
  }
}
