import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

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
  imports: [CommonModule, MatCardModule, MatTableModule],
  templateUrl: './spielerprofil.component.html',
  styleUrls: ['./spielerprofil.component.css']
})
export class SpielerprofilComponent {
  displayedColumns: string[] = ['saison', 'spieltag', 'datum', 'einsatzzeit', 'tore', 'bemerkungen'];

  daten: Spiel[] = [
    { saison: '2022/23', spieltag: 1, datum: '12.08.2022', einsatzzeit: '90 min', tore: 1, bemerkungen: 'Starker Start' },
    { saison: '2022/23', spieltag: 2, datum: '19.08.2022', einsatzzeit: '75 min', tore: 0, bemerkungen: '-' },
    { saison: '2022/23', spieltag: 3, datum: '26.08.2022', einsatzzeit: '60 min', tore: 2, bemerkungen: 'Matchwinner' }
  ];
}
