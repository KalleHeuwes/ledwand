import { Component, model, OnInit } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Player } from '../models/player';
import { ConfigurationService } from '../services/configuration.service';

@Component({
  selector: 'app-smartupdate',
  standalone: true,
  imports: [MatMenuModule, MatButtonModule],
  templateUrl: './smartupdate.component.html',
  styleUrl: './smartupdate.component.css'
})
export class SmartupdateComponent implements OnInit {
  public spielerliste: Player[] = [];
  //public bank: Player[] = [];
  public torschuetze: Player = new Player(0, '', '', '');
  public spielMinute: number = 33;
  
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
  torSpeichern(){
    let pattern = '{"typ": "T", "spielminute": "' + this.spielMinute + '", "hg": "H", '
    + '"rueckennummer": "' + this.torschuetze.id + '", "spielername": "' + this.torschuetze.name1 + ' ' + this.torschuetze.name2 + '", "zusatz": ""}';
  var data = JSON.parse(pattern);
  console.log(data);
  const url: string = ConfigurationService.URL + '/spielstand/torfueruns';
  let headers = new HttpHeaders();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
  this.http.post(url, data, {headers: headers}).subscribe((response) => {
    console.log(response);
  })
  }

  onClickTorschuetze(spieler: Player){
    this.torschuetze = spieler;
  }
    
  aufstellungAuslesen(){
    console.log("Aufstellung auslesen ...");
    
    const url: string = '/assets/aufstellung.csv';

    this.http.get(url, {responseType: 'text'}).subscribe((response) => {

      let csvToRowArray = response.split("\n");
      console.log("* Anzahl " +csvToRowArray.length);
      let modus = '';
      this.spielerliste = [];
      //this.bank = [];
      for (let index = 0; index <= csvToRowArray.length - 1; index++) {
        let rowStr = csvToRowArray[index];
        if(rowStr.startsWith('#Startelf')){       modus = 'S';      };
        if(rowStr.startsWith('#Bank'))    {       modus = 'B';      };
        if(!rowStr.startsWith('#')){
          let row = rowStr.split(";");
          if(modus === 'S' || modus==='B'){
            console.log(modus + " * Spieler " + row[1]);
            let player1 = new Player( parseInt( row[0], 10), row[1], row[2].trim(), '');
            if(modus==='S') { this.spielerliste.push(player1);}
            if(modus==='B') { this.spielerliste.push    (player1);}
          }
        }
      }
    }
  )
  
  }  
}