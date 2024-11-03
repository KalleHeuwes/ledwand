import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-spielerwechsel',
  standalone: true,
  imports: [],
  templateUrl: './spielerwechsel.component.html',
  styleUrl: './spielerwechsel.component.css'
})
export class SpielerwechselComponent {
  @Input() wechsel!: String;
}
