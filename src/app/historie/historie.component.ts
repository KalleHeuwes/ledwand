import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SeasonsComponent } from '../history/seasons/seasons.component';
import { MatchdaysComponent } from '../history/matchdays/matchdays.component';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

@Component({
    selector: 'app-historie',
    imports: [ SeasonsComponent, MatchdaysComponent, CommonModule, FormsModule, MatButtonModule, MatCardModule],
    templateUrl: './historie.component.html',
    styleUrl: './historie.component.css'
})
export class HistorieComponent {
    selectedView: string = 'historisch'; // Standardauswahl
      onAction(action: string) {
    // Platzhalter: ersetze durch deine Logik (Routing, Dialog, Service-Aufruf etc.)
    console.log('Button geklickt:', action);
    // Beispiel: wenn du Routing willst:
    // this.router.navigate(['/detail', action]);
  }
}
