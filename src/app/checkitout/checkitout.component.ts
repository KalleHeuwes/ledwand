import { Component, OnInit } from '@angular/core';
import { Player } from '../player';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-checkitout',
  standalone: true,
  imports: [],
  templateUrl: './checkitout.component.html',
  styleUrl: './checkitout.component.css'
})
export class CheckitoutComponent implements OnInit {
  public startelf: Player[] = [];
  public bank: Player[] = [];
  public message!: string;
  public constructor(private http: HttpClient) {
    
  }
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
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
