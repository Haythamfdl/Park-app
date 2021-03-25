import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-listp-menu',
  templateUrl: './listp-menu.component.html',
  styleUrls: ['./listp-menu.component.css']
})
export class ListpMenuComponent implements OnInit {

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

