import { Component, OnChanges, Input, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Papa from 'papaparse';
import { HttpClient, HttpClientModule } from '@angular/common/http';

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
export class FootballTableComponent implements OnChanges {
  @Input() csvPath: string = '';
  titel: string = 'Saison ' + this.csvPath;
  tableData: TeamStanding[] = [];
  columns: string[] = [];

  constructor(private http: HttpClient) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['csvPath'] && this.csvPath) {
      this.titel = 'Saison ' + this.csvPath.substring(0, 2) + '/' + this.csvPath.substring(2, 4);
      this.loadCsv('assets/' + this.csvPath + '.csv');
    }
  }

  private loadCsv(path: string) {
    this.http.get(path, { responseType: 'text' }).subscribe(csvData => {
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
