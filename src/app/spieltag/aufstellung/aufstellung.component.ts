import { Component, Input, OnInit } from '@angular/core';
import { Player } from 'src/app/models/player';

@Component({
  selector: 'app-aufstellung',
  standalone: true,
  imports: [],
  templateUrl: './aufstellung.component.html',
  styleUrl: './aufstellung.component.css'
})
export class AufstellungComponent {
  @Input() startelf!: Player[];
}
