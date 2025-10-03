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

  public constructor(private http: HttpClient) {
    
  }

  ngOnInit(): void {
    const picPattern: string = 'assets/pictures/players/<VN>_<NN>.jpg';
    let torArray = this.torString.split("|");
    let vn = torArray[2];
    let nn = torArray[3];
    let nr = parseInt(torArray[1]);
    this.torschuetze = new Player(nr, vn, nn, picPattern.replace('<VN>', vn).replace('<NN>', nn));

    setTimeout(() => {      console.log('Warte...');    }, 2000);
    console.log('* TorfuerunsComponent.ngOnInit ' + torArray[0]);
  }
}
