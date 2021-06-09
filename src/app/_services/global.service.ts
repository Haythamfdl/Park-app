import { Injectable } from '@angular/core';
import {Utilisateur} from '../_model/utilisateur';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(private snackBar: MatSnackBar) { }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      panelClass: ['simple-snack-bar']
    });
  }

  checkPermission(user: Utilisateur, codepermission: string): boolean{
    const per = user.permissions.some(i => {
      if (i.code === codepermission) {
        return true;
      }
      return false;
    });
    if (!per){
      this.openSnackBar('Vous n\'avez pas les permission nécessaire pour accéder a cette page !', '');
    }
    return per;
    }
}
