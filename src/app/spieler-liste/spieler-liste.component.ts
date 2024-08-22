import { Component, OnInit } from '@angular/core';
import { SpielerkarteComponent } from '../spielerkarte/spielerkarte.component';
import { CommonModule } from '@angular/common';
import { HttpClient } from "@angular/common/http";
import {MatGridListModule, MatGridTile} from '@angular/material/grid-list';
import { Player } from '../player';

@Component({
  standalone: true,
  imports: [SpielerkarteComponent, CommonModule, MatGridListModule, MatGridTile],
  selector: 'app-spieler-liste',
  templateUrl: './spieler-liste.component.html',
  styleUrl: './spieler-liste.component.css'
})
export class SpielerListeComponent implements OnInit {
  fehler!: string;
  public spielerliste: Player[] = [];
  public message!: string;
  public constructor(private http: HttpClient) {
    
  }

  ngOnInit(): void {
    const url: string = '/assets/teamliste.csv';
    const picPattern: string = 'assets/pictures/players/<VN>_<NN>.jpg';

    this.http.get(url, {responseType: 'text'}).subscribe((response) => {

      let csvToRowArray = response.split("\n");
      console.log("* Anzahl " + csvToRowArray.length);
      for (let index = 0; index <= csvToRowArray.length - 1; index++) {
        let row = csvToRowArray[index].split(";");
        console.log("* Spieler " + row[1] + "; Anzahl Elemente: " + row.length);
        var pic = (row.length === 4 ? row[3].trim() : picPattern.replace('<VN>', row[1]).replace('<NN>', row[2]));
        this.spielerliste.push(new Player( parseInt( row[0], 10), row[1], row[2].trim(), pic));
      }
      console.log(this.spielerliste);
      this.message = "Anzahl gelesene: " + csvToRowArray.length; 
    }
  )

  }

}
