import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatCardModule } from '@angular/material/card'; // Import MatCardModule

@Component({
  selector: 'app-menu-card',
  standalone: true, // Oder in einem Modul deklarieren
  imports: [MatCardModule], // Wichtig: MatCardModule importieren
  templateUrl: './menu-card.component.html',
  styleUrls: ['./menu-card.component.css'],
})
export class MenuCardComponent {
  // Input-Properties für die variablen Daten der Karte
  @Input({ required: true }) title!: string;
  @Input({ required: true }) imageSrc!: string;
  @Input({ required: true }) imageAlt!: string;
  @Input({ required: true }) cardText!: string;
  @Input({ required: true }) actionType!: string; // Der Wert, der beim Klick zurückgegeben wird

  // Output-Event für den Klick
  @Output() cardClicked = new EventEmitter<string>();

  // Methode, die beim Klick aufgerufen wird
  onCardClick(): void {
    this.cardClicked.emit(this.actionType);
  }
}