import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Papa from 'papaparse';
import { HttpClient } from '@angular/common/http';

interface TeamStanding {
  Pl: string;
  Mannschaft: string;
  Sp: string;
  g: string;
  u: string;
  v: string;
  Tore: string;
  Diff: string;
  Pkt: string;
}

@Component({
  selector: 'app-football-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './football-table.component.html'
})
export class FootballTableComponent implements OnInit {
  tableData: TeamStanding[] = [];
  columns: string[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get('assets/abschluss.csv', { responseType: 'text' })
      .subscribe(csvData => {
        Papa.parse(csvData, {
          header: true,
          delimiter: ";",
          skipEmptyLines: true,
          complete: (result) => {
            this.tableData = result.data as TeamStanding[];
            this.columns = result.meta.fields || [];
          }
        });
      });
  }
}
