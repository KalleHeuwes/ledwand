import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-spielerwechsel',
  standalone: true,
  imports: [],
  templateUrl: './spielerwechsel.component.html',
  styleUrl: './spielerwechsel.component.css'
})
export class SpielerwechselComponent implements OnInit {
  @Input() wechsel!: String;
  public txtHeader: String = '';

  ngOnInit(): void {
    let wechselArray = this.wechsel.split("|");
    console.log('* SpielerwechselComponent.ngOnInit ' + wechselArray[0]);
    this.txtHeader = (wechselArray[0].toUpperCase() !== 'G' 
    ? 'Spielerwechsel bei unserer Mannschaft'
    : 'Spielerwechsel beim Gast');
  }


}
