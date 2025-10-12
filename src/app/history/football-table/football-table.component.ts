import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Saison } from 'src/app/historie/saisonauswahl/saison';
import { TeamPerformance } from '../../historie/saisonauswahl/team-performance';
import { SaisonSelectorComponent } from '../../historie/saisonauswahl/saison-selector/saison-selector.component';
import { SaisonsService } from 'src/app/historie/saisonauswahl/saisons.service';

@Component({
  selector: 'app-football-table',
  standalone: true,
  imports: [CommonModule, SaisonSelectorComponent],
  templateUrl: './football-table.component.html'
})
export class FootballTableComponent implements OnInit {
  @Input() csvPath: string = '';
  @Input() titel1: string = '';
  titel: string = 'Saison ';
  tableData: TeamPerformance[] = [];
  seasons: Saison[] = [];
  selectedIndex = 0;
  geladeneSaison: string | null = null;

  constructor(private saisonService: SaisonsService) {}
  ngOnInit(): void {
    console.log('FootballTableComponent: ngOnInit');
    this.titel = 'Saison ' + this.geladeneSaison;
  }

  // Methode, die aufgerufen wird, wenn die Saison ausgewählt wird
  handleSaisonAuswahl(saisonId: string): void {
    this.geladeneSaison = saisonId;
    this.titel = 'Saison ' + this.geladeneSaison;
    console.log(`Abschlusstabellen lädt Daten für Saison-ID: ${saisonId}`);
    this.saisonService.getAbschlusstabelle(saisonId).subscribe(data => {
       this.tableData = data;
    });
  }

  get titelTabelle(): string {
    let t = this.seasons[this.selectedIndex].liga + ' ' 
    + this.seasons[this.selectedIndex].saison + ' ' 
    + this.seasons[this.selectedIndex].bemerkungen;
    return t;
  }
}
