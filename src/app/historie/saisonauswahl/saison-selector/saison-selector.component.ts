import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Saison } from '../saison';
import { map, Observable, tap } from 'rxjs';
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
  saisons$: Observable<Saison[]> | undefined;
  aktuelleSaison: string | undefined;
  @Output()
  saisonGewaehlt = new EventEmitter<string>();
  @Input() filter: string = '*';

  constructor(private saisonService: SaisonsService) { }

  ngOnInit(): void {
    this.saisons$ = this.saisonService.getSaisons(this.filter).pipe(
      tap(saisons => {
        if (saisons && saisons.length > 0) {
          this.aktuelleSaison = saisons[0].saison;
          this.onSaisonChange();
        }
      })
    );
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
