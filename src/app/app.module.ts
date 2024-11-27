import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
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

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
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
    HttpClientModule,
    RouterModule.forRoot([
      {path: 'startseite', component: StartseiteComponent},
      {path: 'players-list', component: SpielerListeComponent},
      {path: 'aufstellung', component: AufstellungComponent},
      {path: 'spieltag', component: SpieltagComponent},
      {path: 'smartupdate', component: SmartupdateComponent},
      {path: 'checkitout', component: CheckitoutComponent},
      {path: '', redirectTo: '/startseite', pathMatch: 'full'},
      {path: '**', component: PageNotFoundComponent}
    ]), 
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
