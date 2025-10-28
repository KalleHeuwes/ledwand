import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpieltagskaderEintrag } from '../../match.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table-of-players',
  imports: [CommonModule],
  templateUrl: './table-of-players.component.html',
  styleUrls: ['./table-of-players.component.css']
})
export class TableOfPlayersComponent {
  @Input() typ: string = '';
  @Input() titel: string = '';
  @Input() playerstable: SpieltagskaderEintrag[] = [];

  constructor(private router: Router) { }

  goToPlayerDetail(player: SpieltagskaderEintrag): void {
    // Navigiert zur Route und übergibt Vorname und Nachname als URL-Parameter
    this.router.navigate(['/spielerprofil', player.nachname, player.vorname]);
  }

  /**
   * Gibt den passenden CSS-Klassennamen zurück.
   * @param status 'IN' oder 'OUT'
   * @returns 'substitution-in' oder 'substitution-out'
   */
  getClassForPlayer(typ: string, einsatz: string): string {
      // Hier können Sie komplexe Logik implementieren
      if (typ === 'bank' && einsatz.indexOf('-') !== -1) {
          return 'substitution-in';
      } else if (typ === 'startelf' && einsatz.indexOf('-') !== -1) {
          return 'substitution-out';
      }
      return ''; // Standard-Klasse
  }

}
