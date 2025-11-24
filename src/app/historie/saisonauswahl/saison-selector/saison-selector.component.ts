import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Saison } from '../saison';
import { map, Observable, tap } from 'rxjs';
import { SaisonsService } from '../saisons.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SpielerPerformance } from '../spieler-performance';

@Component({
  selector: 'app-saison-selector',
  imports: [FormsModule, CommonModule],
  templateUrl: './saison-selector.component.html',
  styleUrl: './saison-selector.component.css'
})
export class SaisonSelectorComponent implements OnInit, OnChanges {
  saisons$: Observable<Saison[]> | undefined;
  saisonsSpieler$: Observable<SpielerPerformance[]> | undefined;
  modus: string = 'Saison';
  aktuelleSaison: string | undefined;
  @Output()
  saisonGewaehlt = new EventEmitter<string>();
  @Input() filter: string = '*';

  constructor(private saisonService: SaisonsService) { }

  ngOnInit(): void {
    console.log(`SaisonSelectorComponent.ngOnInit Filter: ${this.filter}. Lade neue Daten...`)
    this.saisons$ = this.saisonService.getSaisons(this.filter).pipe(
      tap(saisons => {
        if (saisons && saisons.length > 0) {
          console.log(`Saisonsgefunden: ${saisons.length}.`)
          this.aktuelleSaison = saisons[0].saison;
          this.onSaisonChange();
        }
      })
    );

  }

  ngOnChanges(changes: SimpleChanges): void {
    // 2. Prüfen, ob sich der 'filter'-Wert geändert hat
    if (changes['filter']) {
      const newFilterValue = changes['filter'].currentValue;
      
      // 3. Nur wenn der neue Wert ungleich null/undefined ist, Daten neu laden
      if (newFilterValue) {
        console.log(`Neuer Filterwert erkannt: ${newFilterValue}. Lade neue Daten...`);
        const name = newFilterValue.split(',')[0].trim() || '';
        const vorname = newFilterValue.split(',')[1].trim() || '';
        console.log(`Spieler: ${vorname} ${name}. Lade neue Daten...`);
        this.saisonService.getSpielerPerformance(name, vorname).subscribe(data => {
          console.table(data);
        });
        this.saisonsSpieler$ = this.saisonService.getSpielerPerformance(name, vorname).pipe(
          tap(saisons => {
            if (saisons && saisons.length > 0) {
              this.aktuelleSaison = saisons[0].saison;
              this.onSaisonChange();
            }
          })
        );        
      } else {
        // Optional: Behandlung für das Zurücksetzen des Filters
        console.log('Filter wurde zurückgesetzt.');
      }
      this.modus = 'Spieler';
    }
  }

  // Funktion, die bei einer Änderung der Auswahl aufgerufen wird
  onSaisonChange(): void {
    console.log(`[Saisonauswahl] Neue Saison gewählt: ${this.aktuelleSaison}`);
    this.saisonGewaehlt.emit(this.aktuelleSaison);
  }
  
  get titelTabelle(): Observable<string> | undefined {
    let t = this.saisons$?.pipe(
      map(saisons => {
        if (saisons && saisons.length > 0) {
          return saisons[0].liga + ' ' + saisons[0].saison + ' ' + saisons[0].bemerkungen;
        }
        return '';
      })
    );
    return t;
  }

}
