import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SeasonsComponent } from '../history/seasons/seasons.component';
import { MatchdaysComponent } from '../history/matchdays/matchdays.component';

@Component({
    selector: 'app-historie',
    imports: [ SeasonsComponent, MatchdaysComponent, CommonModule, FormsModule],
    templateUrl: './historie.component.html',
    styleUrl: './historie.component.css'
})
export class HistorieComponent {
    selectedView: string = 'historisch'; // Standardauswahl
}
