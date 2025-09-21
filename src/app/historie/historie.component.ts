import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SeasonsComponent } from '../history/seasons/seasons.component';
import { MatchdaysComponent } from '../history/matchdays/matchdays.component';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-historie',
    imports: [ SeasonsComponent, MatchdaysComponent, CommonModule, FormsModule
      , MatButtonModule, MatCardModule],
    templateUrl: './historie.component.html',
    styleUrl: './historie.component.css'
})
export class HistorieComponent {
  constructor(private snackBar: MatSnackBar) {}
    selectedView: string = 'historisch'; // Standardauswahl
      onAction(action: string) {
    // Platzhalter: ersetze durch deine Logik (Routing, Dialog, Service-Aufruf etc.)
    //alert('Button geklickt: ' + action);
        // Toast öffnen, 3 Sekunden sichtbar
    this.snackBar.open(`Card "${action}" geklickt!`, 'Schließen', {
      duration: 3000, // ms
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: 'retro-snackbar-creme',
    });
    // Beispiel: wenn du Routing willst:
    // this.router.navigate(['/detail', action]);
  }
}
