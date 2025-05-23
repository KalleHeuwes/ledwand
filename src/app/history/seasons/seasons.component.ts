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
            this.columns = result.meta.fields || [];
          }
        });
      });
  }
}
