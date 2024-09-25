import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SpieltagsConfig } from '../models/spieltags-config';
import { Player } from '../models/player';

@Injectable({
  providedIn: 'root'
})
export class SpieltagsConfigService {
  public spieltagsConfig!: SpieltagsConfig;

  constructor(  private http: HttpClient, ) { }

  
  auslesen(){
    console.log("SpieltagsConfig auslesen ...");
    const url: string = '/assets/aufstellung.csv';

    this.http.get(url, {responseType: 'text'}).subscribe((response) => {

      let csvToRowArray = response.split("\n");
      console.log("* Anzahl " +csvToRowArray.length);
      let modus = '';
      this.spieltagsConfig.startelf = [];
      this.spieltagsConfig.bank = [];
      for (let index = 0; index <= csvToRowArray.length - 1; index++) {
        let rowStr = csvToRowArray[index];
        if(rowStr.startsWith('#Spiel'))   {       modus = 'G';      };
        if(rowStr.startsWith('#Startelf')){       modus = 'S';      };
        if(rowStr.startsWith('#Bank'))    {       modus = 'B';      };
        if(!rowStr.startsWith('#')){
          let row = rowStr.split(";");
          if(modus === 'S' || modus==='B'){
            console.log(modus + " * Spieler " + row[1]);
            let player1 = new Player( parseInt( row[0], 10), row[1], row[2].trim(), '');
            if(modus==='S') { this.spieltagsConfig.startelf.push(player1);}
            if(modus==='B') { this.spieltagsConfig.bank.push    (player1);}
          }
          if(modus === 'G'){
            if(row[1] === "Datum") this.spieltagsConfig.datum = row[2];
            if(row[1] === "Gegner") this.spieltagsConfig.gegner = row[2];
            if(row[1] === "Bild") this.spieltagsConfig.gegnerBild = row[2];
          }
        }
      }
      console.log('* Startelf *');
      console.log(this.spieltagsConfig.startelf);
      console.log('* Bank *');
      console.log(this.spieltagsConfig.bank);
    }
  )
  }
}
