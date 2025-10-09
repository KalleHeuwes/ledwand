import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Saison } from '../saison';
import { Observable, tap } from 'rxjs';
import { SaisonsService } from '../saisons.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-saison-selector',
  imports: [FormsModule, CommonModule],
  templateUrl: './saison-selector.component.html',
  styleUrl: './saison-selector.component.css'
})
export class SaisonSelectorComponent implements OnInit {
  // 1. Verfügbare Saisons
  saisons$: Observable<Saison[]> | undefined;

  // 2. Aktuell ausgewählte Saison
  aktuelleSaison: string | undefined;

  // 3. Event-Emitter, um die Auswahl an die Elternkomponente zu senden
  @Output()
  saisonGewaehlt = new EventEmitter<string>();

  // SaisonService injizieren
  constructor(private saisonService: SaisonsService) { }

ngOnInit(): void {
    // 4. Daten vom Service laden
    this.saisons$ = this.saisonService.getSaisons().pipe(
      // 5. Nachdem die Daten erfolgreich vom Backend (simuliert) empfangen wurden:
      tap(saisons => {
        if (saisons && saisons.length > 0) {
          // 6. Die neueste (erste) Saison vorwählen
          this.aktuelleSaison = saisons[0].saison;
          // 7. Die Auswahl initial an die Elternkomponente senden
          this.onSaisonChange();
        }
      })
    );
  }

  // Funktion, die bei einer Änderung der Auswahl aufgerufen wird
  onSaisonChange(): void {
    console.log(`[Saisonauswahl] Neue Saison gewählt: ${this.aktuelleSaison}`);
    // Sende die ID der ausgewählten Saison an die Elternkomponente
    this.saisonGewaehlt.emit(this.aktuelleSaison);
  }

}
