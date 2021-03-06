import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginComponent} from './login/login.component';
import {AppRoutingModule} from './app-routing.module';
import {RouterModule} from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {HttpClientModule} from '@angular/common/http';
import {NavbarComponent} from './navbar/navbar.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {WelcomeComponent} from './welcome/welcome.component';
import {ListComponent} from './equipement/list/list.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {ComfirmDialogComponent} from './comfirm-dialog/comfirm-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {AjoutComponent} from './equipement/ajout/ajout.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {FlexModule} from '@angular/flex-layout';
import {ModifierComponent} from './equipement/modifier/modifier.component';
import {InfoComponent} from './equipement/info/info.component';
import {AffecterComponent} from './equipement/affecter/affecter.component';
import {DatePipe} from '@angular/common';
import {ListaComponent} from './agent/lista/lista.component';
import {ListaEquipComponent} from './agent/lista-equip/lista-equip.component';
import {AjoutaComponent} from './agent/ajouta/ajouta.component';
import {ModifieraComponent} from './agent/modifiera/modifiera.component';
import {InfoaComponent} from './agent/infoa/infoa.component';
import {ListpComponent} from './probleme/listp/listp.component';
import {ListaProblemeComponent} from './agent/lista-probleme/lista-probleme.component';
import {AjoutpComponent} from './probleme/ajoutp/ajoutp.component';
import {MatSelectModule} from '@angular/material/select';
import {ModifierpComponent} from './probleme/modifierp/modifierp.component';
import {InfopComponent} from './probleme/infop/infop.component';
import {ListpRComponent} from './probleme/listp-r/listp-r.component';
import {ListpMenuComponent} from './probleme/listp-menu/listp-menu.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    WelcomeComponent,
    ListComponent,
    ComfirmDialogComponent,
    AjoutComponent,
    ModifierComponent,
    InfoComponent,
    AffecterComponent,
    ListaComponent,
    ListaEquipComponent,
    AjoutaComponent,
    ModifieraComponent,
    InfoaComponent,
    ListpComponent,
    ListaProblemeComponent,
    AjoutpComponent,
    ModifierpComponent,
    InfopComponent,
    ListpRComponent,
    ListpMenuComponent,
    ListpNrComponent,
    ListsComponent,
    AjoutersComponent,
    ModifiersComponent,
    InfosComponent,
    ListsUComponent,
    InfouComponent,
    ModifieruComponent,
    ListmMenuComponent,
    ListmComponent,
    ListmLComponent,
    ListmNlComponent,
    EnvoyermComponent,
    InfomComponent,
    AjouteruComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule,
    MatCardModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatButtonToggleModule,
    MDBBootstrapModule.forRoot(),
    FlexModule,
    FormsModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {
}
