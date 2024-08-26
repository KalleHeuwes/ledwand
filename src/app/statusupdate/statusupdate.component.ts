import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatGridListModule, MatGridTile} from '@angular/material/grid-list';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-statusupdate',
  standalone: true,
  imports: [CommonModule, MatGridListModule, MatGridTile],
  templateUrl: './statusupdate.component.html',
  styleUrl: './statusupdate.component.css'
})
export class StatusupdateComponent {
  url: string = 'http://heuweslap2:8080/spielstand';
  public toreHeim: number = 0;
  public toreGast: number = 0;
  public tsNummer: number = -1;
  public spielstand: string = '';

  public constructor(private http: HttpClient) {
    
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

  playSound(){
    let audio = new Audio();
    audio.src="../assets/sounds/punk.wav";
    console.log("Spiel " + audio.src + "...");
    audio.load();
    audio.play();
  }
}
