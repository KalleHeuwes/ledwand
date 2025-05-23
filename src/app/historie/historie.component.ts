import { Component } from '@angular/core';
import { FootballTableComponent } from '../history/football-table/football-table.component';
import { SeasonsComponent } from '../history/seasons/seasons.component';

@Component({
    selector: 'app-historie',
    imports: [ FootballTableComponent, SeasonsComponent],
    templateUrl: './historie.component.html',
    styleUrl: './historie.component.css'
})
export class HistorieComponent {

}
