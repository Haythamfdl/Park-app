import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-comfirm-dialog',
  templateUrl: './comfirm-dialog.component.html',
  styleUrls: ['./comfirm-dialog.component.css']
})
export class ComfirmDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ComfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) {
  }
}
