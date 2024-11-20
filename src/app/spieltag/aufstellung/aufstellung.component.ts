import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Player } from 'src/app/models/player';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { SpielerkarteKleinComponent } from 'src/app/spielerkarte-klein/spielerkarte-klein.component';

@Component({
  selector: 'app-aufstellung',
  standalone: true,
  imports: [SpielerkarteKleinComponent],
  templateUrl: './aufstellung.component.html',
  styleUrl: './aufstellung.component.css'
})
export class AufstellungComponent implements OnInit {

  @Input() startelf!: Player[];
  @Input() bank!: Player[];
  @Input() trainer!: string;

  time = new Date();
  rxTime = new Date();
  intervalId: any;

  letzteNr: number = -1;
  testOut: string = '';
  aktImg: string = '/assets/pictures/others/Daniel_Apke.jpg';

  public constructor(private http: HttpClient) {  }  

  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      this.time = new Date();
      this.naechstenEintragAuslesen();
    }, 1000);
  }

  naechstenEintragAuslesen(){
    console.log("aufstellung.component naechstenEintragAuslesen ...");

    const picPattern: string = 'assets/pictures/players/<VN>_<NN>.jpg';
    let name1: string = '';
    let name2: string = '';
    this.http.get(ConfigurationService.URL + '/matches/aufstellung/naechster'
      , {responseType: 'text'}).subscribe((response) => {
        let ret: number = parseInt(response) ;
      this.letzteNr = ret;
      if(ret >= 1 && ret <=11){
        name1 = this.startelf[ret].name1.toString();
        name2 = this.startelf[ret].name2.toString();
      }      
      if(ret >= 12){
        name1 = this.bank[ret - 11].name1.toString();
        name2 = this.bank[ret - 11].name2.toString();
      }
      
      this.aktImg = picPattern.replace('<VN>', name1).replace('<NN>', name2);
    })
  }
}
