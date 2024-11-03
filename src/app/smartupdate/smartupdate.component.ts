import { Component, model, OnInit } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
import { Player } from '../models/player';
import { ConfigurationService } from '../services/configuration.service';
import {NgxMatTimepickerModule} from 'ngx-mat-timepicker';
import { Observable } from 'rxjs';
import { Anpfiff } from '../models/anpfiff';

@Component({
  selector: 'app-smartupdate',
  standalone: true,
  imports: [MatMenuModule, MatButtonModule, NgxMatTimepickerModule],
  templateUrl: './smartupdate.component.html',
  styleUrl: './smartupdate.component.css'
})
export class SmartupdateComponent implements OnInit {
  public spielerliste: Player[] = [];
  public torschuetze: Player = new Player(0, '', '', '');
  public spielerRaus: Player = new Player(0, '', '', '');
  public spielerRein: Player = new Player(0, '', '', '');
  public spielMinute: number = 33;
  public nachspielzeit: number = 0;
  public bvAuswahl: string = '';
  rxTime = new Date();
  intervalId: any;
  public bvListe: string[]  = ['Elfmeter verschossen', 'Rote Karte'];
  public anpfiff: string = '';
  public halbzeit: number = 0;

  public constructor(private http: HttpClient) {  }

  ngOnInit(): void {    
    this.aufstellungAuslesen(); 
    this.intervalId = setInterval(() => {
      //this.time = new Date();
      //this.spielstandAbfragen();
      //this.spieltagAuslesen();
      //this.wertePaareAbfragen();
      this.anpfiffAuslesen();
    }, 5000);
   }

  torSpeichern(hg: string){
    var pattern ="";
    var urlpart = "";
    if(hg === "H"){
      pattern = '{"typ": "T", "hg": "H", "spielminute": "' + this.spielMinute + '", '
      + '"rueckennummer": "' + this.torschuetze.id + '", "spielername": "' + 
      this.torschuetze.name1 + ' ' + this.torschuetze.name2 + '", "zusatz": ""}';
      urlpart="torfueruns";
    }else{
      pattern = '{"typ": "T", "hg": "G", "spielminute": "' + this.spielMinute + '", "zusatz": ""}';
      urlpart="torfuergast";
    }
    if (!confirm('Tor speichern für ' + (hg === "H" ? "uns" : "den Gast") + ' ?'))     return;
    var data = JSON.parse(pattern);
    const url: string = ConfigurationService.URL + '/spielstand/' + urlpart;
    this.http.post(url, data, {headers: ConfigurationService.JSONHeaders()}).subscribe((response) => {
      console.log(response);
    })
  }

  onClickTorschuetze(spieler: Player){
    this.torschuetze = spieler;
  }

  anpfiffSetzen(hz: number){
    let hour = this.rxTime.getHours();
    let minuts = this.rxTime.getMinutes();
    let seconds = this.rxTime.getSeconds();
    let jetzt = hour + ":" + minuts + ":" + seconds
    if (!confirm('Anpfiff auf ' + jetzt + ' setzen ?'))     return;

    const url: string = ConfigurationService.URL + '/status/anpfiff/' + hz +'/' + jetzt;
    this.http.post(url, null, {headers: ConfigurationService.JSONHeaders()}).subscribe((response) => {
      console.log(response);
    })
  }

  nachspielzeitOffset(offset: number){
    this.nachspielzeit+=offset;
  }    

  nachspielzeitSetzen(){
    if (!confirm('Nachspielzeit auf ' + this.nachspielzeit + ' Minuten setzen ?'))     return;
    const url: string = ConfigurationService.URL + '/status/nachspielzeit/' + this.nachspielzeit;
    this.http.post(url, null, {headers: ConfigurationService.JSONHeaders()}).subscribe((response) => {
      console.log(response);
    })
  }    

  auswechseln(){
    if (!confirm('Wirklich auswechseln ?'))     return;
    const url: string = ConfigurationService.URL + '/teams/spielerwechsel/' + 'H' + '/' + this.spielerRaus.id + '/' + this.spielerRein.id;
    this.http.post(url, null, {headers: ConfigurationService.JSONHeaders()}).subscribe((response) => {
      console.log(response);
    })
  }   

  spielerwechsel(rausrein: string, spieler: Player){
    if('Raus' === rausrein) this.spielerRaus = spieler;
    if('Rein' === rausrein) this.spielerRein = spieler;
  }   

  bvSpeichern(){
    if (!confirm('Besonderes Vorkommnis speichern ?'))     return;
  }

  spieltagEinlesen(){

  }

  onChangeObj(obj: any){
    console.log(obj);
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
            let player1 = new Player( parseInt( row[0], 10), row[1], row[2].trim(), '');
            if(modus==='S') { this.spielerliste.push(player1);}
            if(modus==='B') { this.spielerliste.push    (player1);}
          }
        }
      }
    }
  )
  
  }  

  anpfiffAuslesen(){
    //console.log("Anpfiff auslesen ...");
    let ret: Observable<Anpfiff> = this.http.get<Anpfiff>(
      ConfigurationService.URL + '/status/anpfiff');
    ret.subscribe(r => {
      this.halbzeit = r.hz;
      this.anpfiff = r.uhrzeit;
    })
    this.spielMinute = ConfigurationService.berechneSpielminute(this.anpfiff, this.halbzeit);

  }    
}
