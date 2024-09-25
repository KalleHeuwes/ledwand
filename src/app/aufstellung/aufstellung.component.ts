import { Component, OnInit } from '@angular/core';
import { SpielerkarteKleinComponent } from '../spielerkarte-klein/spielerkarte-klein.component';
import { CommonModule } from '@angular/common';
import { HttpClient } from "@angular/common/http";
import {MatGridListModule, MatGridTile} from '@angular/material/grid-list';
import { Player } from '../models/player';

@Component({
  standalone: true,
  imports: [SpielerkarteKleinComponent, CommonModule, MatGridListModule, MatGridTile],
  selector: 'app-aufstellung',
  templateUrl: './aufstellung.component.html',
  styleUrl: './aufstellung.component.css'
})
export class AufstellungComponent implements OnInit {
  public startelf: Player[] = [];
  public bank: Player[] = [];
  public message!: string;
  public constructor(private http: HttpClient) {
    
  }

  ngOnInit(): void {
    const url: string = '/assets/aufstellung.csv';

    this.http.get(url, {responseType: 'text'}).subscribe((response) => {

      let csvToRowArray = response.split("\n");
      console.log("* Anzahl " +csvToRowArray.length);
      let modus = '';
      for (let index = 0; index <= csvToRowArray.length - 1; index++) {
        let rowStr = csvToRowArray[index];
        if(rowStr.startsWith('#Startelf')){       modus = 'S';      };
        if(rowStr.startsWith('#Bank'))    {       modus = 'B';      };
        if(!rowStr.startsWith('#') && (modus === 'S' || modus==='B')){
          let row = rowStr.split(";");
          console.log(modus + " * Spieler " + row[1]);
          let player1 = new Player( parseInt( row[0], 10), row[1], row[2].trim(), '');
          if(modus==='S') { this.startelf.push(player1);}
          if(modus==='B') { this.bank.push    (player1);}
        }
      }
      console.log('* Startelf *');
      console.log(this.startelf);
      console.log('* Bank *');
      console.log(this.bank);
      this.message = "Anzahl gelesene: " + csvToRowArray.length; 
    }
  )

  }

}
