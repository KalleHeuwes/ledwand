import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpielerkarteComponent } from '../../spielerkarte/spielerkarte.component';
import { Player } from '../../models/player';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-torfueruns',
  standalone: true,
  imports: [SpielerkarteComponent, CommonModule],
  templateUrl: './torfueruns.component.html',
  styleUrl: './torfueruns.component.css'
})
export class TorfuerunsComponent implements OnInit {
  @Input() torString!: String;
  public torschuetze!: Player;
  public txtHeader!: string;

  public constructor(private http: HttpClient) {
    
  }

  ngOnInit(): void {
    let torArray = this.torString.split("|");
    setTimeout(() => {      console.log('Warte...');    }, 2000);
    console.log('* TorfuerunsComponent.ngOnInit ' + torArray[0]);
    this.txtHeader = (torArray[0].toUpperCase() !== 'G' 
    ? 'Tor für unsere Mannschaft'
    : 'Tor für den Gast');
    //this.liesSpielerliste(parseInt( wechselArray[1], 10), parseInt( wechselArray[2], 10));
  }
}
