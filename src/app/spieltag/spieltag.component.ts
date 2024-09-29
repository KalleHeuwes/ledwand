import { Component, OnInit, OnDestroy } from '@angular/core';
import { map, Observable, share, Subscription, timer, from } from "rxjs";
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { SpielstandUpdate } from '../models/spielstand-update';
import { ConfigurationService } from '../services/configuration.service';
import { KeyValuePair } from '../models/keyValuePair';

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
  public toreHeim: number = 0;
  public toreGast: number = 0;
  public spielstand: string = '';
  public spielstandUpdate: SpielstandUpdate | undefined;
  public laufschrift: string = "<LAUFSCHRIFT>";
  public laufschriftScrollAmount: number = 33;
  public laufschriftVisibility: boolean = false;
  public datum: string = '';
  public gegner: string = '';
  public gegnerBild: string = '';
  public anpfiff: string = '';
  public spielMinute: number = 0;

  public constructor(private http: HttpClient) {
    
  }

  
  ngOnInit() {
    // Using Basic Interval
    this.intervalId = setInterval(() => {
      this.time = new Date();
      this.spielstandAbfragen();
      this.spieltagAuslesen();
      this.wertePaareAbfragen();
      this.berechneSpielminute();
    }, 1000);

    // Using RxJS Timer
    this.subscription = timer(0, 1000)
      .pipe(
        map(() => new Date()),
        share()
      )
      .subscribe(time => {
        let hour = this.rxTime.getHours();
        let minuts = this.rxTime.getMinutes();
        let seconds = this.rxTime.getSeconds();
        //let a = time.toLocaleString('en-US', { hour: 'numeric', hour12: true });
        let NewTime = hour + ":" + minuts + ":" + seconds
      });
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  spielstandAbfragen(){
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
  }
  
  getWertePaare(): Observable<KeyValuePair[]>{
    return this.http.get<KeyValuePair[]>(ConfigurationService.URL + '/status/keyValuePairs');
  }

  wertePaareAbfragen(){
    let paare: Observable<KeyValuePair[]> = this.getWertePaare();
    paare.pipe()
    from(paare).subscribe(n => {
      let k: KeyValuePair[] = n;
      k.forEach(kv => {
        if(this.anpfiff === '' && kv.keyName.startsWith('Anpfiff Hz 2')) {
          this.anpfiff = kv.valueStr;
          console.log('Anpfiff gesetzt auf ' + this.anpfiff );
        }
      })
    });
  }
 
  berechneSpielminute(){
    //if(this.anpfiff !== '') {
      let hour = this.rxTime.getHours();
      let minuts = this.rxTime.getMinutes();
      let seconds = this.rxTime.getSeconds();
      let NewTime = hour + ":" + minuts + ":" + seconds
      
      let startDate = new Date("2018-11-29 " + this.anpfiff);
      let aktDate = new Date("2018-11-29 " + NewTime);
      let diffMs: number = (aktDate.getTime() - startDate.getTime()); // milliseconds
      let diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
      this.spielMinute = diffMins;
    //}
  }

  spielstandSetzen(hg:string, tsNum: number){
    var data = JSON.parse('{"heim": ' + this.toreHeim + ', "gast": ' + this.toreGast + ', "hg": "' + hg + '", "tsNummer": ' + tsNum + '}');
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    this.http.patch(this.url, data, {headers: headers}).subscribe((response) => {
      console.log(response);
    })
  }

  spieltagAuslesen(){
    //console.log("Spieltag auslesen ...");
    
    const url: string = '/assets/spieltag.csv';

    this.http.get(url, {responseType: 'text'}).subscribe((response) => {

      let csvToRowArray = response.split("\n");
      //console.log("* Anzahl " +csvToRowArray.length);
      for (let index = 0; index <= csvToRowArray.length - 1; index++) {
        let rowStr = csvToRowArray[index];
        if(!rowStr.startsWith('#')){
          let row = rowStr.split(";");

            if(row[1] === "Datum") this.datum = row[2];
            if(row[1] === "Gegner") this.gegner = row[2];
            if(row[1] === "Bild") this.gegnerBild = row[2];

        }
      }


    }
  )
  
  }  

}
