import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule, MatGridTile} from '@angular/material/grid-list';
import { SpielerListeComponent } from './spieler-liste/spieler-liste.component';
import { HttpClientModule } from '@angular/common/http';
import { AufstellungComponent } from './aufstellung/aufstellung.component';
import { SpieltagComponent } from './spieltag/spieltag.component';

import { CheckitoutComponent } from './checkitout/checkitout.component';
import { StartseiteComponent } from './startseite/startseite.component';
import { SmartupdateComponent } from './smartupdate/smartupdate.component';
import { DragDropComponent } from './temp/drag-drop/drag-drop.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { HistorieComponent } from './historie/historie.component';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { SpielanzeigeComponent } from './temp/spielanzeige/spielanzeige.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatchDetailsComponent } from './historie/match/match-details/match-details.component';
import { SpielerprofilComponent } from './history/spielerprofil/spielerprofil.component';
import { PerformanceGraphComponent } from './historie/performance-graph/performance-graph.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    DragDropComponent
  ],
  imports: [
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatCardModule, 
    MatButtonModule,
    MatSlideToggleModule,
    MatGridListModule,
    MatGridTile,
    SpielerListeComponent,
    AufstellungComponent,
    SpieltagComponent,
    BrowserModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: 'startseite', 				component: StartseiteComponent},
      {path: 'grafik', 				component: PerformanceGraphComponent},
      {path: 'players-list', 			component: SpielerListeComponent},
      {path: 'aufstellung', 			component: AufstellungComponent},
      {path: 'spieltag', 				component: SpieltagComponent},
      {path: 'smartupdate', 			component: SmartupdateComponent},
      {path: 'checkitout', 				component: CheckitoutComponent},
      {path: 'historie',				component: HistorieComponent},
      {path: 'spielerprofil/:nachname/:vorname',				component: SpielerprofilComponent},
      {path: 'spiel/:saison/:spieltag',	component: MatchDetailsComponent},
      {path: 'temp', 					component: SpielanzeigeComponent},
      {path: '', redirectTo: '/startseite', pathMatch: 'full'},
      {path: '**', 						component: PageNotFoundComponent}
    ]),
    DragDropModule,
    MatMenuModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule, 
    MatSnackBarModule,
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
