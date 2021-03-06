import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
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
import {ListaEquipComponent} from './agent/lista-equip/lista-equip.component';
import {AjoutaComponent} from './agent/ajouta/ajouta.component';
import {ModifieraComponent} from './agent/modifiera/modifiera.component';
import {InfoaComponent} from './agent/infoa/infoa.component';
import {ListpComponent} from './probleme/listp/listp.component';
import {ListaProblemeComponent} from './agent/lista-probleme/lista-probleme.component';
import {AjoutpComponent} from './probleme/ajoutp/ajoutp.component';
import {ModifierpComponent} from './probleme/modifierp/modifierp.component';
import {InfopComponent} from './probleme/infop/infop.component';
import {ListpMenuComponent} from './probleme/listp-menu/listp-menu.component';
import {ListpRComponent} from './probleme/listp-r/listp-r.component';
import {ListpNrComponent} from './probleme/listp-nr/listp-nr.component';
import {ListsComponent} from './solution/lists/lists.component';
import {AjoutersComponent} from './solution/ajouters/ajouters.component';
import {ModifiersComponent} from './solution/modifiers/modifiers.component';
import {InfosComponent} from './solution/infos/infos.component';
import {ListsUComponent} from './solution/lists-u/lists-u.component';
import {InfouComponent} from './utilisateur/infou/infou.component';
import {ModifieruComponent} from './utilisateur/modifieru/modifieru.component';
import {ListmMenuComponent} from './message/listm-menu/listm-menu.component';
import {ListmComponent} from './message/listm/listm.component';
import {ListmLComponent} from './message/listm-l/listm-l.component';
import {ListmNlComponent} from './message/listm-nl/listm-nl.component';
import {EnvoyermComponent} from './message/envoyerm/envoyerm.component';
import {InfomComponent} from './message/infom/infom.component';
import {AjouteruComponent} from './utilisateur/ajouteru/ajouteru.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {
    path: 'app', component: NavbarComponent,
    children: [
      {path: '', component: WelcomeComponent},
      {path: 'equipements', component: ListComponent},
      {path: 'equipements/ajout', component: AjoutComponent},
      {path: 'equipements/modifier', component: ModifierComponent},
      {path: 'equipements/info/:num', component: InfoComponent},
      {path: 'equipements/affecter', component: AffecterComponent},
      {path: 'agents', component: ListaComponent},
      {path: 'agents/equipements/:num', component: ListaEquipComponent},
      {path: 'agents/problemes/:num', component: ListaProblemeComponent},
      {path: 'agents/ajout', component: AjoutaComponent},
      {path: 'agents/modifier', component: ModifieraComponent},
      {path: 'agents/info/:num', component: InfoaComponent},
      {
        path: 'problemes', component: ListpMenuComponent, children: [
          {path: '', component: ListpComponent},
          {path: 'true', component: ListpRComponent},
          {path: 'false', component: ListpNrComponent}
        ]
      },
      {path: 'problemes/ajout', component: AjoutpComponent},
      {path: 'problemes/modifier', component: ModifierpComponent},
      {path: 'problemes/info/:id', component: InfopComponent},
      {path: 'solutions/probleme/:id', component: ListsComponent},
      {path: 'solutions/ajout', component: AjoutersComponent},
      {path: 'solutions/modifier', component: ModifiersComponent},
      {path: 'solutions/info/:id', component: InfosComponent},
      {path: 'solutions/user/:id', component: ListsUComponent},
      {path: 'user/info/:id', component: InfouComponent},
      {path: 'user/ajout', component: AjouteruComponent},
      {path: 'myprofile', component: ModifieruComponent},
      {
        path: 'messages', component: ListmMenuComponent, children: [
          {path: '', component: ListmComponent},
          {path: 'true', component: ListmLComponent},
          {path: 'false', component: ListmNlComponent}
        ]
      },
      {path: 'messages/envoyer', component: EnvoyermComponent},
      {path: 'messages/info', component: InfomComponent}
    ]
  },

  {path: '**', redirectTo: 'app'}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
