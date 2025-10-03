import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Papa from 'papaparse';
import { HttpClient } from '@angular/common/http';


interface Season {
  Saison: string;
  Liga: string;
  Spiele: string;
  Platz: string;
  Punkte: string;
  Bemerkungen: string;
  Import_Tabelle: string;
  Import_Spiele: string;
}

@Component({
  selector: 'app-seasons',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './seasons.component.html'
})
export class SeasonsComponent implements OnInit {
  tableData: Season[] = [];
  columns: string[] = [];
  selectedIndex = 0;

  get selectedCsv(): string {
    return this.tableData[this.selectedIndex].Import_Tabelle;
  }

  get titelTabelle(): string {
    let t = this.tableData[this.selectedIndex].Liga + ' ' 
    + this.tableData[this.selectedIndex].Saison + ' ' 
    + this.tableData[this.selectedIndex].Bemerkungen;
    return t;
  }

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get('assets/historie/saisons.csv', { responseType: 'text' })
      .subscribe(csvData => {
        Papa.parse(csvData, {
          header: true,
          delimiter: ";",
          skipEmptyLines: true,
          complete: (result) => {
            this.tableData = result.data as Season[];
            const allColumns = result.meta.fields || [];
            this.columns = allColumns.slice(0, -2); // entfernt die letzten zwei Spalten
          }
        });
      });
  }
  
  getRowClass(bemerkungen: any): string {

  if (bemerkungen.includes('Absteiger')){
    return 'row-absteiger';
  }

  if (bemerkungen.includes('Aufsteiger')) {
    return 'row-aufsteiger';
  }

  if (bemerkungen.includes('Relegation')) {
    return 'row-relegation';
  }

  return 'row-aufsteiger';
}

}
