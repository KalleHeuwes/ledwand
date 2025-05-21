import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpielerkarteComponent } from '../../spielerkarte/spielerkarte.component';
import { Player } from '../../models/player';
import { HttpClient } from "@angular/common/http";

@Component({
    selector: 'app-spielerwechsel',
    imports: [SpielerkarteComponent, CommonModule],
    templateUrl: './spielerwechsel.component.html',
    styleUrl: './spielerwechsel.component.css'
})
export class SpielerwechselComponent implements OnInit {
  @Input() wechsel!: String;
  public txtHeader: String = '';
  public spielerraus!: Player;
  public spielerrein!: Player;

  public constructor(private http: HttpClient) {
    
  }

  ngOnInit(): void {
    let wechselArray = this.wechsel.split("|");
    setTimeout(() => {      console.log('Warte...');    }, 2000);
    console.log('* SpielerwechselComponent.ngOnInit ' + wechselArray[0]);
    this.liesSpielerliste(parseInt( wechselArray[1], 10), parseInt( wechselArray[2], 10));
  }

  liesSpielerliste(rausNr: number, reinNr: number){
    const url: string = '/assets/teamliste.csv';
    const picPattern: string = 'assets/pictures/players/<VN>_<NN>.jpg';

    this.http.get(url, {responseType: 'text'}).subscribe((response) => {

      let csvToRowArray = response.split("\n");
      for (let index = 0; index <= csvToRowArray.length - 1; index++) {
        let row = csvToRowArray[index].split(";");
        let spielerNr = parseInt( row[0], 10);
        if(spielerNr === rausNr){
          var pic = (row.length === 4 ? row[3].trim() : picPattern.replace('<VN>', row[1]).replace('<NN>', row[2]));
          this.spielerraus = new Player( spielerNr, row[1], row[2].trim(), pic);
          console.log('Spieler raus: ' + this.spielerraus.id + ', Bild: ' + this.spielerraus.pic)
        }
        if(spielerNr === reinNr){
          var pic = (row.length === 4 ? row[3].trim() : picPattern.replace('<VN>', row[1]).replace('<NN>', row[2]));
          this.spielerrein = new Player( spielerNr, row[1], row[2].trim(), pic);
          console.log('Spieler rein: ' + this.spielerrein.id + ', Bild: ' + this.spielerrein.pic)
        }
      }
    }
  )
  }

}
