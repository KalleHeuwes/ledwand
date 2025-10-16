import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SaisonSelectorComponent } from '../../historie/saisonauswahl/saison-selector/saison-selector.component';
import { SaisonsService } from 'src/app/historie/saisonauswahl/saisons.service';
import { Spieltag } from 'src/app/historie/saisonauswahl/spieltag';

@Component({
  selector: 'app-matchdays',
    standalone: true,
  imports: [CommonModule, SaisonSelectorComponent],
  templateUrl: './matchdays.component.html',
  styleUrl: './matchdays.component.css'
})
export class MatchdaysComponent implements OnInit {
  @Input() csvPath: string = '';
  titel: string = 'Saison ' + this.csvPath;
  tableData: Spieltag[] = [];
  selectedIndex = 0;
  geladeneSaison: string | null = null;

  constructor(private saisonService: SaisonsService, private router: Router) {}
  ngOnInit(): void {
    console.log('MatchdaysComponent: ngOnInit');
  }

  // Methode, die aufgerufen wird, wenn die Saison ausgewählt wird
  handleSaisonAuswahl(saisonId: string): void {
    this.geladeneSaison = saisonId;
    console.log(`MatchdaysComponent lädt Daten für Saison-ID: ${saisonId}`);
    this.saisonService.getSpieltage(saisonId).subscribe(data => {
       this.tableData = data;
    });
  }

    zeigeSpielDetails(spiel: number) {
    // Navigiert zu /spiel/2024/5
    this.router.navigate(['/spiel', this.geladeneSaison, spiel]);
  }

}
