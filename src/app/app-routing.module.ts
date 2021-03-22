import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from './login/login.component';
import {RouterModule, Routes} from '@angular/router';
import {NavbarComponent} from './navbar/navbar.component';
import {WelcomeComponent} from './welcome/welcome.component';
import {ListComponent} from './equipement/list/list.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'app', component: NavbarComponent,
  children:[
    {path: '',component:WelcomeComponent},
    {path: 'equipements',component:ListComponent}
  ]}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }