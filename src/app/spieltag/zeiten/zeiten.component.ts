import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-zeiten',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './zeiten.component.html',
  styleUrl: './zeiten.component.css'
})
export class ZeitenComponent {
  @Input() spielMinute!: string;
  @Input() uhrzeit!: string;
  @Input() nachspielzeit!: string;
  @Input() datum!: string;
}
