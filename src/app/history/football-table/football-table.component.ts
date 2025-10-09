import { Component, OnChanges, Input, SimpleChanges, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Papa from 'papaparse';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Saison } from 'src/app/historie/saisonauswahl/saison';
interface TeamStanding {
  Platz: string;
  Mannschaft: string;
  Spiele: string;
  g: string;
  u: string;
  v: string;
  Tore: string;
  Diff: string;
  Punkte: string;
}

@Component({
  selector: 'app-football-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './football-table.component.html'
})
export class FootballTableComponent implements OnChanges, OnInit {
  @Input() csvPath: string = '';
  @Input() titel1: string = '';
  titel: string = 'Saison ' + this.csvPath;
  tableData: TeamStanding[] = [];
  seasons: Saison[] = [];
  columns: string[] = [];  
  selectedIndex = 0;

  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.http.get('assets/historie/saisons.csv', { responseType: 'text' })
      .subscribe(csvData => {
        Papa.parse(csvData, {
          header: true,
          delimiter: ";",
          skipEmptyLines: true,
          complete: (result) => {
            this.seasons = result.data as Saison[];
            const allColumns = result.meta.fields || [];
            this.columns = allColumns.slice(0, -2); // entfernt die letzten zwei Spalten
          }
        });
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['csvPath'] && this.csvPath) {
      this.titel = 'Saison ' + this.csvPath.substring(0, 2) + '/' + this.csvPath.substring(2, 4);
      this.loadCsv('assets/historie/abschlusstabellen/' + this.csvPath + '.csv');
    }
  }

  private loadCsv(path: string) {
    this.titel = this.titelTabelle;
      
    this.http.get(path, { responseType: 'text' }).subscribe(csvData => {
      console.log('Pfad:', path);
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

  onSelectChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    const index = this.seasons.findIndex(file => file.Import_Tabelle === value);
    if (index !== -1) {
      this.selectedIndex = index;
      console.log(this.selectedIndex);
      console.log(this.seasons[this.selectedIndex].Import_Tabelle);    
      this.loadCsv('assets/historie/abschlusstabellen/' + this.seasons[this.selectedIndex].Import_Tabelle + '.csv');
    }
  }

  previous() {
    if (this.selectedIndex > 0) {
      this.selectedIndex--;
      this.loadCsv('assets/historie/abschlusstabellen/' + this.seasons[this.selectedIndex].Import_Tabelle + '.csv');
    }
  }

  next() {
    if (this.selectedIndex < this.seasons.length - 1) {
      this.selectedIndex++;
      this.loadCsv('assets/historie/abschlusstabellen/' + this.seasons[this.selectedIndex].Import_Tabelle + '.csv');
    }
  }
  
  get selectedCsv(): string {
    return this.seasons[this.selectedIndex].Import_Tabelle;
  }

  get titelTabelle(): string {
    let t = this.seasons[this.selectedIndex].Liga + ' ' 
    + this.seasons[this.selectedIndex].saison + ' ' 
    + this.seasons[this.selectedIndex].Bemerkungen;
    return t;
  }
}
