import { Component, model, OnInit } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
import { Player } from '../models/player';

@Component({
  selector: 'app-smartupdate',
  standalone: true,
  imports: [MatMenuModule, MatButtonModule],
  templateUrl: './smartupdate.component.html',
  styleUrl: './smartupdate.component.css'
})
export class SmartupdateComponent implements OnInit {
  public startelf: Player[] = [];
  public bank: Player[] = [];
  
  public constructor(private http: HttpClient) {
    
  }
  ngOnInit(): void {
    this.aufstellungAuslesen();
  }

  public opt: string = '';
  public opts = ["a", "b"];
  public cars = [
    {model: "Smart", color: "blue"}, 
    {model: "Fiat 500", color: "green"}
  ];
  test1(){
    alert('Hallo, Welt !');
  }
    
  aufstellungAuslesen(){
    console.log("Aufstellung auslesen ...");
    
    const url: string = '/assets/aufstellung.csv';

    this.http.get(url, {responseType: 'text'}).subscribe((response) => {

      let csvToRowArray = response.split("\n");
      console.log("* Anzahl " +csvToRowArray.length);
      let modus = '';
      this.startelf = [];
      this.bank = [];
      for (let index = 0; index <= csvToRowArray.length - 1; index++) {
        let rowStr = csvToRowArray[index];
        if(rowStr.startsWith('#Startelf')){       modus = 'S';      };
        if(rowStr.startsWith('#Bank'))    {       modus = 'B';      };
        if(!rowStr.startsWith('#')){
          let row = rowStr.split(";");
          if(modus === 'S' || modus==='B'){
            console.log(modus + " * Spieler " + row[1]);
            let player1 = new Player( parseInt( row[0], 10), row[1], row[2].trim(), '');
            if(modus==='S') { this.startelf.push(player1);}
            if(modus==='B') { this.bank.push    (player1);}
          }
        }
      }
    }
  )
  
  }  
}
