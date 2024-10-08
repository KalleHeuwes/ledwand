import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatGridListModule, MatGridTile} from '@angular/material/grid-list';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import { ConfigurationService } from '../services/configuration.service';

@Component({
  selector: 'app-statusupdate',
  standalone: true,
  imports: [CommonModule, MatGridListModule, MatGridTile, FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './statusupdate.component.html',
  styleUrl: './statusupdate.component.css'
})
export class StatusupdateComponent implements OnInit {
  
  public url: string = ConfigurationService.URL + '/spielstand';
  public host: string = ConfigurationService.HOST;
  public toreHeim: number = 0;
  public toreGast: number = 0;

  @Input() 
  public tsNummer: number = -1;

  @Input() 
  public spielMinute: number = -1;

  @Input() 
  public spielerName: string = '';
  
  public spielstand: string = '';
  intervalId: any;

  public constructor(private http: HttpClient) {
    
  }
  
  ngOnInit() {
    // Using Basic Interval
    this.intervalId = setInterval(() => {
      this.spielstandAbfragen();
    }, 1000);
  }

  increment(hg: string) {
    var tsNum = (hg==='H' ? this.tsNummer : -1);
    if(hg==='H') this.toreHeim +=1;
    if(hg==='G') this.toreGast +=1;
    this.spielstandSetzen(hg, tsNum);
  }

  decrement(hg: string) {
    if(hg==='H') this.toreHeim -=1;
    if(hg==='G') this.toreGast -=1;
    this.spielstandSetzen(hg, -99);
  }

  reset() {
    this.toreHeim = 0;
    this.toreGast = 0;
    this.spielstandSetzen('', -99);
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

  spielstandAbfragen(){
    this.http.get(this.url, {responseType: 'text'}).subscribe((response) => {
      //console.log(response);
      var pos1 = response.indexOf(':');
      this.toreHeim = parseInt(response.substring(pos1+1,pos1+2));
      var pos1 = response.indexOf(':', pos1 + 1);
      this.toreGast = parseInt(response.substring(pos1+1,pos1+2));
      this.spielstand = response;
    })
  }

  torSetzen(hg:string){
    let pattern = '{"typ": "T", "spielminute": "' + this.spielMinute + '", "hg": "' + hg + '", '
      + '"rueckennummer": "' + this.tsNummer + '", "spielername": "' + this.spielerName + '", "zusatz": ""}';
    var data = JSON.parse(pattern);
    //console.log(data);
    const url: string = ConfigurationService.URL + '/spielstand/torfueruns';
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    this.http.post(url, data, {headers: headers}).subscribe((response) => {
      console.log(response);
    })
  }

  playSound(){
    let audio = new Audio();
    audio.src="../assets/sounds/punk.wav";
    console.log("Spiel " + audio.src + "...");
    audio.load();
    audio.play();
  }

  
  spieltagAuslesen(){
    const url: string = '/assets/spieltag.csv';

    this.http.get(url, {responseType: 'text'}).subscribe((response) => {

      let csvToRowArray = response.split("\n");
      for (let index = 0; index <= csvToRowArray.length - 1; index++) {
        let rowStr = csvToRowArray[index];
        if(!rowStr.startsWith('#')){
          let row = rowStr.split(";");
          /*
          if(row[1] === "Datum") this.datum = row[2];
          if(row[1] === "Gegner") this.gegner = row[2];
          if(row[1] === "Bild") this.gegnerBild = row[2];
          */
        }
      }
    }
    )
  }  
}
