import { Component, OnInit, OnDestroy } from '@angular/core';
import { map, Observable, share, Subscription, timer, from } from "rxjs";
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { SpielstandUpdate } from '../models/spielstand-update';
import { ConfigurationService } from '../services/configuration.service';
import { KeyValuePair } from '../models/keyValuePair';
import { Anpfiff } from '../models/anpfiff';

@Component({
  selector: 'app-spieltag',
  standalone: true,
  imports: [CommonModule],
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
  public datum: string = '';
  public teamheim: string = ''; // SpVg Emsdetten 05
  public teamgast: string = '';
  public gegnerBild: string = '';
  public anpfiff: string = '';
  public halbzeit: number = 0;
  public spielMinute: number = 0;
  public nachspielzeit: string = '';
  public statusKz: string = '';

  public constructor(private http: HttpClient) {  }  

  ngOnInit() {
    //console.log("spieltag.component ngOnInit ...");
    this.intervalId = setInterval(() => {
      this.time = new Date();
      this.statusAuslesen();
      this.spielstandAbfragen();
      this.spieltagAuslesen();
      this.anpfiffAuslesen();
      this.wertePaareAbfragen();
      this.spielMinute = ConfigurationService.berechneSpielminute(this.anpfiff, this.halbzeit);
    }, 1000);
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  statusAuslesen(){
    this.http.get(this.urlStatus, {responseType: 'text'}).subscribe((response) => {
      this.statusKz = response;
    })
  }

  statusZurücksetzen(){
    //return; 

    this.http.post(ConfigurationService.URL + '/status/resetstatus'
      , {responseType: 'text'}).subscribe((response) => {
      this.statusKz =(response == null ? '' :  response.toString());
    })
  }

  spielstandAbfragen(){
    //if(this.statusKz !== "T") return;
    console.log("spieltag.component spielstandAbfragen ..." + this.statusKz);

    this.http.get(this.url, {responseType: 'text'}).subscribe((response) => {
      if("[]" == response){
        this.toreHeim = 0;
        this.toreGast = 0;
        this.spielstandSetzen('', -99);
      }
      var pos1 = response.indexOf(':');
      this.toreHeim = parseInt(response.substring(pos1+1,pos1+2));
      var pos1 = response.indexOf(':', pos1 + 1);
      this.toreGast = parseInt(response.substring(pos1+1,pos1+2));
      this.spielstand = response;
      this.laufschriftVisibility = this.toreGast > 0 || this.toreHeim > 0;
    })
 
    this.http.get(this.urlLaufschrift, {responseType: 'text'}).subscribe((response) => {
      this.laufschrift = response;
    })
    //this.statusZurücksetzen();
  }

  anpfiffAuslesen(){
    if(this.statusKz !== "A") return;
    console.log("Anpfiff auslesen ...");
    let ret: Observable<Anpfiff> = this.http.get<Anpfiff>(
      ConfigurationService.URL + '/status/anpfiff');
    ret.subscribe(r => {
      if(r!== null){
        this.halbzeit = r.hz;
        this.anpfiff = r.uhrzeit;
        }
    })
    this.statusZurücksetzen();
  }

  getWertePaare(): Observable<KeyValuePair[]>{
    return this.http.get<KeyValuePair[]>(ConfigurationService.URL + '/keyValuePairs');
  }

  wertePaareAbfragen(){
    let paare: Observable<KeyValuePair[]> = this.getWertePaare();
    paare.pipe()
    from(paare).subscribe(n => {
      let k: KeyValuePair[] = n;
      k.forEach(kv => {
        if(kv.keyName.startsWith('XXXAnpfiff Hz 1')) {
          this.halbzeit = 1;
          this.anpfiff = kv.valueStr;
        }
        if(kv.keyName.startsWith('XXXAnpfiff Hz 2')) {
          this.halbzeit = 2;
          this.anpfiff = kv.valueStr;
        }
        if(kv.keyName.startsWith('Nachspielzeit')) {
          this.nachspielzeit = (kv.valueStr === "0" ? "" : "+" + kv.valueStr);
        }
      })
    });
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
    if(this.statusKz !== "S") return;
    console.log("spieltag.component spieltagAuslesen ...");
    const url: string = '/assets/spieltag.csv';

    this.http.get(url, {responseType: 'text'}).subscribe((response) => {

      let csvToRowArray = response.split("\n");
      for (let index = 0; index <= csvToRowArray.length - 1; index++) {
        let rowStr = csvToRowArray[index];
        if(!rowStr.startsWith('#')){
          let row = rowStr.split(";");
          if(row[1] === "Datum") this.datum = row[2];
          if(row[1] === "Gegner") this.teamgast = ''; //row[2];
          if(row[1] === "Bild") this.gegnerBild = row[2];
        }
      }
    }
    )
  }  

}
