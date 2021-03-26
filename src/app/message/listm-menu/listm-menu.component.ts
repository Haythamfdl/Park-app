import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-listm-menu',
  templateUrl: './listm-menu.component.html',
  styleUrls: ['./listm-menu.component.css']
})
export class ListmMenuComponent implements OnInit {

  constructor(private router: Router
  ) {
  }

  ngOnInit(): void {
    if(JSON.parse(localStorage.getItem('Utilisateur')) == null)
      this.router.navigate(['/']).then();
  }

  redirect(value:any) {
    this.router.navigate(['/app/problemes/'+value]).then();
  }
}

