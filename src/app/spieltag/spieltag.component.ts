import { Component, OnInit, OnDestroy } from '@angular/core';
import { map, Observable, share, Subscription, timer, from } from "rxjs";
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { SpielstandUpdate } from '../models/spielstand-update';
import { ConfigurationService } from '../services/configuration.service';
import { KeyValuePair } from '../models/keyValuePair';
import { Anpfiff } from '../models/anpfiff';
import { SpielerwechselComponent } from './spielerwechsel/spielerwechsel.component';
import { TorfuerunsComponent } from './torfueruns/torfueruns.component';
import { SpielstandComponent } from './spielstand/spielstand.component';
import { ZeitenComponent } from './zeiten/zeiten.component';
import { Player } from '../models/player';
import { AufstellungComponent } from './aufstellung/aufstellung.component';
//import {StatusKennzeichen} from '../enums/status-kennzeichen';

enum StatusKennzeichen {
  Tor = 'T',
  Anpfiff = 'A',
  Spieltag = 'S',
  KeyValuePairs = 'K',
  Spielerwechsel = 'W',
  AufstellungAn = 'Y1',
  AufstellungAus = 'Y0',
  AufstellungNaechster = 'YN'
}

@Component({
  selector: 'app-spieltag',
  standalone: true,
  imports: [CommonModule, SpielerwechselComponent, TorfuerunsComponent, SpielstandComponent, ZeitenComponent, AufstellungComponent],
  templateUrl: './spieltag.component.html',
  styleUrl: './spieltag.component.css'
})
export class SpieltagComponent implements OnInit, OnDestroy {
  time = new Date();
  rxTime = new Date();
  intervalId: any;
  subscription!: Subscription;
  url: string = ConfigurationService.URL + '/spielstand';
  urlLaufschrift: string = this.url + '/laufschrift';
  urlStatus: string = ConfigurationService.URL + '/status/status';
  public toreHeim: number = 0;
  public toreGast: number = 0;
  public spielstand: string = '';
  public spielstandUpdate: SpielstandUpdate | undefined;
  public laufschrift: string = "<LAUFSCHRIFT>";
  public laufschriftScrollAmount: number = 33;
  public laufschriftVisibility: boolean = false;
  public datum: string = '18.11.2024';
  public teamheim: string = ''; // SpVg Emsdetten 05
  public teamgast: string = '';
  public gegnerBild: string = '';
  public anpfiff: string = '';
  public halbzeit: number = 0;
  public spielMinute: number = -1;
  public nachspielzeit: string = '';
  public statusKz: string = '';
  public hideDivFlg: boolean = true;
  public hideAufstellung: boolean = true;
  public hideTorschuetzeFlg: boolean = true;
  public spielerwechsel: String = '';
  public torschuetze: String = '';

  public startelf: Player[] = [];
  public bank: Player[] = [];

  public constructor(private http: HttpClient) {  }  

  ngOnInit() {
    console.log("spieltag.component ngOnInit ...");
    this.intervalId = setInterval(() => {
      this.time = new Date();
      this.statusAuslesen();
      this.spielstandAbfragen();
      this.spieltagAuslesen();
      this.aufstellungAuslesen();
      this.anpfiffAuslesen();
      this.spielerwechselAnzeigen();
      this.spielMinute = ConfigurationService.berechneSpielminute(this.anpfiff, this.halbzeit);
    }, 1000);
  }

  spielerwechselAnzeigen() {
    if(this.statusKz !== StatusKennzeichen.Spielerwechsel) return;

    console.log("spieltag.component spielerwechselAnzeigen ...");

    this.http.get(ConfigurationService.URL + '/teams/spielerwechsel', {responseType: 'text'}).subscribe((response) => {
      this.spielerwechsel = response;
      console.log('* this.spielerwechsel = ' + response);
      this.hideDivFlg = false;
      setTimeout(() => {      this.hideDivFlg = true;    }, 12000);
    })


    this.statusZurücksetzen();
  }

  isWechselHidden(){
    return this.statusKz !== StatusKennzeichen.Spielerwechsel
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  //Liest das aktuelle Statuskennzeichen aus
  //Damit wird entschieden, welche weiteren Abfragen ausgeführt werden.
  statusAuslesen(){
    //return; 
    this.http.get(this.urlStatus, {responseType: 'text'}).subscribe((response) => {
      this.statusKz = response;
    })
  }

  statusZurücksetzen(){
    //return; 
    console.log("spieltag.component statusZurücksetzen ..." + this.statusKz);
    this.http.post(ConfigurationService.URL + '/status/resetstatus'
      , {responseType: 'text'}).subscribe((response) => {
      this.statusKz =(response == null ? '' :  response.toString());
    })
  }

  spielstandAbfragen(){
    if(this.statusKz !== StatusKennzeichen.Tor) return;
    console.log("spieltag.component spielstandAbfragen ..." + this.statusKz);

    let toreHeimAlt = this.toreHeim;
    // Spielstand vom Server abfragen
    this.http.get(this.url, {responseType: 'text'}).subscribe((response) => {
      if("[]" == response){
        this.toreHeim = 0;
        this.toreGast = 0;
        this.spielstandSetzen('', -99);
      }
      var data = JSON.parse(response);
      this.toreHeim = data[0].heim;
      this.toreGast = data[0].gast;
      this.spielstand = response;
      this.laufschriftVisibility = this.toreGast > 0 || this.toreHeim > 0;
       
      // Torschütze als Bild anzeigen
      if(toreHeimAlt < this.toreHeim){
        this.torschuetze = 'H|' + data[0].tsNummer + '|' + data[0].spielername.replace(' ', '|');
        
        this.hideTorschuetzeFlg = false;
        setTimeout(() => {      this.hideTorschuetzeFlg = true;    }, 12000);
      }
    })


    // Laufschrift vom Server abfragen
    this.http.get(this.urlLaufschrift, {responseType: 'text'}).subscribe((response) => {
      this.laufschrift = response;
    })

    
    this.statusZurücksetzen();
  }

  anpfiffAuslesen(){
    if(this.statusKz !== StatusKennzeichen.Anpfiff) return;
    
    this.http.get(ConfigurationService.URL + '/status/anpfiff', {responseType: 'text'}).subscribe((r) => {
      if(r!== null){
        console.log("Anpfiff auslesen ... " + r);
        let items = r.split('|');
        this.halbzeit = parseInt(items[0]);
        this.anpfiff = items[1];
        this.nachspielzeit = (parseInt(items[2]) > 0 ? '+' + items[2] : '');
        }
    });
    /*
    let ret: Observable<String> = this.http.get<String>(ConfigurationService.URL + '/status/anpfiff');
    ret.subscribe(r => {
      if(r!== null){
        let items = r.split('|');
        this.halbzeit = parseInt(items[0]);
        this.anpfiff = items[1];
        }
    })
        */
    this.statusZurücksetzen();
  }

  spielstandSetzen(hg:string, tsNum: number){
    //console.log("spieltag.component spielstandSetzen ...");
    var data = JSON.parse('{"heim": ' + this.toreHeim + ', "gast": ' + this.toreGast 
      + ', "hg": "' + hg + '", "tsNummer": ' + tsNum + '}');
    this.http.patch(this.url, data, {headers: ConfigurationService.JSONHeaders()}).subscribe((response) => {
      console.log(response);
    })
  }

  spieltagAuslesen(){
    if(this.statusKz !== StatusKennzeichen.Spieltag) return;

    console.log("spieltag.component spieltagAuslesen ...");

    let url: string = ConfigurationService.URL + '/matches/matchday/long';
    this.http.get(url, {responseType: 'text'}).subscribe((response) => {

      var data = JSON.parse(response);
      let i: number = 0;
      while (i < data.startelf.length) {
        this.logPlayer('S', data.startelf[i]);
        i++;
      }

      i = 0;
      while (i < data.bank.length) {
        this.logPlayer('B', data.bank[i]);
        i++;
      }    
    }
    )

    url = ConfigurationService.URL + '/matches/matchday/short';
    this.http.get(url, {responseType: 'text'}).subscribe((response) => {

      let items = response.split("|");
      this.teamgast = items[0];
      this.datum = items[1];
      this.gegnerBild = items[2];
      this.spielMinute = -1;
    }
    )
    this.statusKz = StatusKennzeichen.Tor;
    this.spielstandAbfragen();
    this.statusZurücksetzen();
  }  

  logPlayer(sb: string, player: any){
    let playerObj: Player;
    playerObj = new Player(player.number, player.firstName, player.name, player.imageUrl);
    var stat = player.playerStatistics;
    if(stat) {
      playerObj.setStatistik(stat.spiele, stat.minuten, stat.tore);
    }
    
    if(sb == 'S'){
      this.startelf.push(playerObj);
    }else{
      this.bank.push(playerObj);
    }
  }

  aufstellungAuslesen(){
    if(this.statusKz !== StatusKennzeichen.AufstellungAn && this.statusKz !== StatusKennzeichen.AufstellungAus) return;

    if(this.statusKz == StatusKennzeichen.AufstellungAn && this.hideAufstellung == true){
      console.log('Aufstellung auslesen ...');
      this.hideAufstellung = false;
    }

    if(this.statusKz == StatusKennzeichen.AufstellungAus){
      console.log('Aufstellung ausblenden ...');
      this.hideAufstellung = true;
      this.statusZurücksetzen();
      }
  }

}
