import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Player } from 'src/app/models/player';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { SpielerkarteKleinComponent } from 'src/app/spielerkarte-klein/spielerkarte-klein.component';
import { SpielerkarteComponent } from 'src/app/spielerkarte/spielerkarte.component';

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
  selector: 'app-aufstellung',
  standalone: true,
  imports: [SpielerkarteKleinComponent, SpielerkarteComponent, CommonModule],
  templateUrl: './aufstellung.component.html',
  styleUrl: './aufstellung.component.css'
})
export class AufstellungComponent implements OnInit {

  @Input() startelf!: Player[];
  @Input() bank!: Player[];
  @Input() trainer!: string;
  public player!: Player;
  public statusKz: string = '';

  time = new Date();
  rxTime = new Date();
  intervalId: any;

  letzteNr: number = -1;
  testOut: string = '';
  aktImg: string = '/assets/pictures/others/Daniel_Apke.jpg';

  public constructor(private http: HttpClient) {  }  

  ngOnInit(): void {
    console.log("aufstellung.component ngOnInit ...");

    this.intervalId = setInterval(() => {
      this.time = new Date();
      this.statusAuslesen();
      this.naechstenEintragAuslesen();
    }, 100);
  }

  //Liest das aktuelle Statuskennzeichen aus
  //Damit wird entschieden, welche weiteren Abfragen ausgeführt werden.
  statusAuslesen(){
    //return; 
    this.http.get(ConfigurationService.URL + '/status/status', {responseType: 'text'}).subscribe((response) => {
      this.statusKz = response;
    })
  }

  naechstenEintragAuslesen(){
    if(this.statusKz !== StatusKennzeichen.AufstellungNaechster) return;

    //console.log("aufstellung.component naechstenEintragAuslesen ..." + this.statusKz);

    const picPattern: string = 'assets/pictures/players/<VN>_<NN>.jpg';
    let name1: string = '';
    let name2: string = '';
    
    this.http.get(ConfigurationService.URL + '/matches/aufstellung/naechster'
      , {responseType: 'text'}).subscribe((response) => {
        if(response !== null){
          let ret: number = parseInt(response) ;
          if(ret != this.letzteNr){
            this.letzteNr = ret;
            if(ret >= 1 && ret <=11){
              this.player = this.startelf[ret];
            }      
            if(ret >= 12){
              this.player = this.bank[ret - 11];
            }
            if(this.player!==null){
              console.log('this.letzteNr: ' + this.letzteNr);
              name1 = this.player.name1.toString();
              name2 = this.player.name2.toString();       
            }
          }


        }

    })
  }
}
