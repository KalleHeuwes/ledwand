import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Papa from 'papaparse';
import { HttpClient } from '@angular/common/http';
import { FootballTableComponent } from '../football-table/football-table.component';


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
  imports: [CommonModule, FootballTableComponent],
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
    this.http.get('assets/saisons.csv', { responseType: 'text' })
      .subscribe(csvData => {
        Papa.parse(csvData, {
          header: true,
          delimiter: ";",
          skipEmptyLines: true,
          complete: (result) => {
            this.tableData = result.data as Season[];
            const allColumns = result.meta.fields || [];
            this.columns = allColumns.slice(0, -2); // entfernt die letzten zwei Spalten

            //this.columns = result.meta.fields || [];
          }
        });
      });
  }

  /*
    onFileChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.selectedCsv = select.value;
  }
    */
  
  onSelectChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    const index = this.tableData.findIndex(file => file.Import_Tabelle === value);
    if (index !== -1) {
      this.selectedIndex = index;
    }
  }
    previous() {
    if (this.selectedIndex > 0) {
      this.selectedIndex--;
    }
  }

  next() {
    if (this.selectedIndex < this.tableData.length - 1) {
      this.selectedIndex++;
    }
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
