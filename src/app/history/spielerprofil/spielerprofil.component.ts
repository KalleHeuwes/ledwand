import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { SaisonsService } from 'src/app/historie/saisonauswahl/saisons.service';
import { SpieltagskaderEintrag } from 'src/app/historie/match/match.module';
import { SaisonSelectorComponent } from '../../historie/saisonauswahl/saison-selector/saison-selector.component';
import { ActivatedRoute, ParamMap } from '@angular/router';

interface Spiel {
  saison: string;
  spieltag: number;
  datum: string;
  einsatzzeit: string;
  tore: number;
  bemerkungen: string;
}

@Component({
  selector: 'app-spielerprofil',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule, MatAutocompleteModule, MatInputModule, MatFormFieldModule
    , ReactiveFormsModule, SaisonSelectorComponent],
  templateUrl: './spielerprofil.component.html',
  styleUrls: ['./spielerprofil.component.css']
})
export class SpielerprofilComponent implements OnInit {
  spieler = {
    name: '.',
    vorname: '.',
    geburtsdatum: '.',
    imVereinSeit: '.',
    position: '.',
    beschreibung: '...',
    photo01: '...'
  };
  saisonId: string = '*';
  myControl = new FormControl('');
  players: string[] = ['']; // Beispiel-Daten
  filteredPlayers: Observable<string[]> | undefined;
  displayedColumns: string[] = ['spieltag', 'einsatzzeit', 'spielminuten', 'datum', 'ergebnis', 'gegner'];
  daten: SpieltagskaderEintrag[] = [];

  constructor( private saisonService: SaisonsService, private route: ActivatedRoute) {}

  ngOnInit() {
    console.log('SpielerprofilComponent.ngOnInit');
    this.route.paramMap.subscribe((params: ParamMap) => {
      const nachname = params.get('nachname');
      const vorname = params.get('vorname');
      if (nachname && vorname) {
        this.spieler.name = nachname;
        this.spieler.vorname = vorname; //assets/spieler-aktuell.jpg
        this.spieler.photo01 = `assets/pictures/players/${vorname}_${nachname}.jpg`;
        console.log('Foto: ' + this.spieler.photo01);
        this.saisonService.getSpieleEinesSpielers(nachname, vorname, this.saisonId).subscribe(data => {
          this.daten = data;
        });
      }
    });


    this.saisonService.getSpielerliste().subscribe(data => {
      this.players = data;
    });
    this.filteredPlayers = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterPlayers((value == null ? '' : value)))
    );
  }

  private _filterPlayers(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.players.filter(player => player.toLowerCase().includes(filterValue));
  }

  /**
   * Wird aufgerufen, sobald ein Spieler aus der Autocomplete-Liste ausgewählt wird.
   * @param spielername Der Name des ausgewählten Spielers.
   */
  spielerGewaehlt(spielername: string): void {
    console.log(`Der ausgewählte Spieler ist: ${spielername}`);
    this.spieler.name = spielername.split(',')[0].trim() || '';
    this.spieler.vorname = spielername.split(',')[1].trim() || '';
    this.spieler.photo01 = `assets/pictures/players/${this.spieler.vorname}_${this.spieler.name}.jpg`;
    this.saisonService.getSpieleEinesSpielers(this.spieler.name, this.spieler.vorname, this.saisonId).subscribe(data => {
      this.daten = data;
    });
    
    this.saisonService.getSpielerPerformance(this.spieler.name, this.spieler.vorname).subscribe(data => {
      console.table(data);
    });
  }

  handleSaisonAuswahl(saisonId: string): void {
    this.saisonId = saisonId.replace('/', '');
    console.log(`Spielerprofil lädt Daten für Saison-ID: ${this.saisonId}`);
    this.saisonService.getSpieleEinesSpielers(this.spieler.name, this.spieler.vorname, this.saisonId).subscribe(data => {
      this.daten = data;
    });
  }

}
