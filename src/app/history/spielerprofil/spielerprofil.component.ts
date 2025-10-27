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
  imports: [CommonModule, MatCardModule, MatTableModule, MatAutocompleteModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule],
  templateUrl: './spielerprofil.component.html',
  styleUrls: ['./spielerprofil.component.css']
})
export class SpielerprofilComponent implements OnInit {
  spieler = {
    name: 'Mustermann',
    vorname: 'Max',
    geburtsdatum: '01.01.1995',
    imVereinSeit: '2010',
    position: 'Stürmer',
    beschreibung: 'Max ist ein schneller, wendiger Stürmer mit großem Torriecher. Seine Stärken liegen im 1-gegen-1 und im Abschluss mit beiden Füßen. Er gilt als Publikumsliebling durch seinen Einsatz.'
  };
  myControl = new FormControl('');
  players: string[] = ['Spieler A', 'Spieler B', 'Max Mustermann', 'Erika Musterfrau']; // Beispiel-Daten
  filteredPlayers: Observable<string[]> | undefined;
  displayedColumns: string[] = ['saison', 'spieltag', 'datum', 'einsatzzeit', 'tore', 'bemerkungen'];
  constructor( private saisonService: SaisonsService) {}
  ngOnInit() {
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
  }

  daten: Spiel[] = [
    { saison: '2022/23', spieltag: 1, datum: '12.08.2022', einsatzzeit: '90 min', tore: 1, bemerkungen: 'Starker Start' },
    { saison: '2022/23', spieltag: 2, datum: '19.08.2022', einsatzzeit: '75 min', tore: 0, bemerkungen: '-' },
    { saison: '2022/23', spieltag: 3, datum: '26.08.2022', einsatzzeit: '60 min', tore: 2, bemerkungen: 'Matchwinner' }
  ];
}
