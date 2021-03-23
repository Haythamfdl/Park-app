import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from './login/login.component';
import {RouterModule, Routes} from '@angular/router';
import {NavbarComponent} from './navbar/navbar.component';
import {WelcomeComponent} from './welcome/welcome.component';
import {ListComponent} from './equipement/list/list.component';
import {AjoutComponent} from './equipement/ajout/ajout.component';
import {ModifierComponent} from './equipement/modifier/modifier.component';
import {InfoComponent} from './equipement/info/info.component';
import {AffecterComponent} from './equipement/affecter/affecter.component';
import {ListaComponent} from './agent/lista/lista.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'app', component: NavbarComponent,
  children:[
    {path: '',component:WelcomeComponent},
    {path: 'equipements',component:ListComponent},
    {path: 'equipements/ajout',component:AjoutComponent},
    {path: 'equipements/modifier',component:ModifierComponent},
    {path: 'equipements/info/:num',component:InfoComponent},
    {path: 'equipements/affecter',component:AffecterComponent},
    {path: 'agents',component:ListaComponent}
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
