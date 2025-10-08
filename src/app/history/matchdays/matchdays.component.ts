import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Papa from 'papaparse';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Spieltage } from 'src/app/models/spieltage';

//Saison;Spieltag;Datum;HA;Gegner;Ergebnis;Punkte;Platz;PPP;Geschossen;Kassiert
interface Matchday {
  Saison: string;
  Spieltag: string;
  Datum: string;
  HA: string;
  Gegner: string;
  Ergebnis: string;
  Punkte: string;
  Platz: string;
  PPP: string;
  Geschossen: string;
  Kassiert: string;
}

@Component({
  selector: 'app-matchdays',
    standalone: true,
  imports: [CommonModule],
  templateUrl: './matchdays.component.html',
  styleUrl: './matchdays.component.css'
})
export class MatchdaysComponent implements OnInit {
  @Input() csvPath: string = '';
  titel: string = 'Saison ' + this.csvPath;
  tableData: Matchday[] = [];
  spieltage: Spieltage[] = [];
  columns: string[] = [];
  url: string = 'http://localhost:8080/historie/spieltage/202223';

  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.loadCsv('assets/historie/spieltageAlle.csv');
  }

  private LoadFromUrl(){
    this.http.get<Spieltage[]>(this.url).subscribe(data => {
      this.spieltage = data;
    });
  }


  private loadCsv(path: string) {
    this.http.get(path, { responseType: 'text' }).subscribe(csvData => {
      Papa.parse(csvData, {
        header: true,
        delimiter: ";",
        skipEmptyLines: true,
        complete: (result) => {
          console.log(result);
          this.tableData = result.data as Matchday[];
          this.columns = result.meta.fields || [];
        }
      });
    });
  }
}
