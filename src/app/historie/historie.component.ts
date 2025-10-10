import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SeasonsComponent } from '../history/seasons/seasons.component';
import { MatchdaysComponent } from '../history/matchdays/matchdays.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SpielerprofilComponent } from '../history/spielerprofil/spielerprofil.component';
import { FootballTableComponent } from '../history/football-table/football-table.component';
import { HistorieAdminComponent } from '../history/historie-admin/historie-admin.component';

@Component({
    selector: 'app-historie',
    standalone: true,
    imports: [ SeasonsComponent, MatchdaysComponent, SpielerprofilComponent, CommonModule, FormsModule
      , MatButtonModule, MatCardModule, FootballTableComponent, HistorieAdminComponent],
    templateUrl: './historie.component.html',
    styleUrl: './historie.component.css'
})
export class HistorieComponent {
  constructor(private snackBar: MatSnackBar) {}
  selectedView: string = 'menu'; // Standardauswahl
  onAction(action: string) {
    this.snackBar.open(`Card "${action}" geklickt!`, 'Schließen', {   // Toast öffnen, 3 Sekunden sichtbar
      duration: 3000, // ms
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: 'retro-snackbar-creme',
    });
    this.selectedView = action;
    // this.router.navigate(['/detail', action]); // Beispiel: wenn du Routing willst:
  }

}
