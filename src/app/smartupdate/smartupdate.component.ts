import { Component, ChangeDetectionStrategy, signal, OnInit } from '@angular/core';

import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule} from '@angular/material/expansion';
import { HttpClient } from '@angular/common/http';
import { Player } from '../models/player';
import { ConfigurationService } from '../services/configuration.service';
import { NgxMatTimepickerModule} from 'ngx-mat-timepicker';
import { Observable } from 'rxjs';
import { Anpfiff } from '../models/anpfiff';

@Component({
  selector: 'app-smartupdate',
  standalone: true,
  imports: [MatMenuModule, MatButtonModule, NgxMatTimepickerModule, MatExpansionModule],
  templateUrl: './smartupdate.component.html',
  styleUrl: './smartupdate.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SmartupdateComponent implements OnInit {
  //readonly panelOpenState = signal(false);
  public spielerliste: Player[] = [];
  public torschuetze: Player = new Player(0, '', '', '');
  public spielerRaus: Player = new Player(0, '', '', '');
  public spielerRein: Player = new Player(0, '', '', '');
  public spielMinute: number = -1;
  public bvAuswahl: string = '';
  rxTime = new Date();
  intervalId: any;
  public bvListe: string[]  = ['Elfmeter verschossen', 'Rote Karte'];
  public anpfiff: string = '';
  public nachspielzeit: string = '';
  public halbzeit: number = 0;
  public screensize: string = '';
  teamgast: string = '';
  datum: string = '';

  public constructor(private http: HttpClient) {  }

  ngOnInit(): void {    
    this.screensize = 'Breite: ' + window.innerWidth + '/ Höhe: ' + window.innerHeight;
    this.aufstellungAuslesen(); 
    this.intervalId = setInterval(() => {
      //this.time = new Date();
      //this.spielstandAbfragen();
      //this.spieltagAuslesen();
      //this.wertePaareAbfragen();
      this.anpfiffAuslesen();
      this.spielMinute = ConfigurationService.berechneSpielminute(this.anpfiff, this.halbzeit);
      //console.log("smartupdate.ngOnInit.spielMinute: " + this.spielMinute);
    }, 1000);
   }

   aufstellungAnzeigen(onoff: string){
    if(onoff !== 'N'){
      let frage: string = (onoff == '1' ? 'Aufstellung anzeigen ?' : 'Aufstellung ausblenden ?');
      if (!confirm(frage))     return;  
    }

    const url: string = ConfigurationService.URL + '/status/setstatus/Y' + onoff;
    this.http.post(url, {responseType: 'text'}).subscribe((response) => {
      console.log(response);
    })

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

  onClickBesonderesVorkommnis(bv: String){
    this.bvAuswahl = bv.toString();
  }
  anpfiffSetzen(hz: number){
    let hour = this.rxTime.getHours();
    let minuts = this.rxTime.getMinutes();
    let seconds = this.rxTime.getSeconds();
    let jetzt = hour + ":" + minuts + ":" + seconds
    if (!confirm('Anpfiff auf ' + jetzt + ' setzen ?'))     return;

    const url: string = ConfigurationService.URL + '/status/anpfiff/' + hz +'/' + jetzt;
    this.http.post(url, {responseType: 'text'}).subscribe((response) => {
      console.log(response);
    })
  }

  nachspielzeitOffset(offset: number){
    this.nachspielzeit+=offset;
  }    

  nachspielzeitSetzen(){
    if (!confirm('Nachspielzeit auf ' + this.nachspielzeit + ' Minuten setzen ?'))     return;
    const url: string = ConfigurationService.URL + '/status/nachspielzeit/' + this.nachspielzeit;
    this.http.post(url, {responseType: 'text'}).subscribe((response) => {
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

  bvSpeichern(hg: String){
    if (!confirm('Besonderes Vorkommnis für ' + hg + ' speichern ?'))     return;
  }

  spieltagEinlesen(){
    //http://localhost:8080/matches/read/static-assets-spieltag.csv
    if (!confirm('Wirklich den Spieltag neu laden ?'))     return;
    let url: string = ConfigurationService.URL + '/matches/read/static-assets-spieltag.csv';
    this.http.post(url, null, {headers: ConfigurationService.JSONHeaders()}).subscribe((response) => {
      console.log(response);
    })

    url = ConfigurationService.URL + '/matches/matchday/short';
    this.http.get(url, {responseType: 'text'}).subscribe((response) => {

      let items = response.split("|");
      this.teamgast = items[0];
      this.datum = items[1];
    }
    )
  }

  onChangeObj(obj: any){
    this.bvAuswahl = obj
    console.log(obj);
    alert(this.bvAuswahl);
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

    this.http.get(ConfigurationService.URL + '/status/anpfiff', {responseType: 'text'}).subscribe((r) => {
      if(r!== null){
        //console.log("Anpfiff auslesen ... " + r);
        let items = r.split('|');
        this.halbzeit = parseInt(items[0]);
        this.anpfiff = items[1];
        this.nachspielzeit = (parseInt(items[2]) > 0 ? '+' + items[2] : '');
        }
    });

    this.spielMinute = ConfigurationService.berechneSpielminute(this.anpfiff, this.halbzeit);
    //console.log("smartupdate.anpfiffAuslesen.spielMinute: " + this.spielMinute);
  }

  setDesign(design: String){
    const url: string = ConfigurationService.URL + '/matches/matchday/design/' + design;

    this.http.post(url, {responseType: 'text'}).subscribe((response) => {
      console.log(response);
    })
  }
}
