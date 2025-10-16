import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatchData, SpieltagskaderEintrag } from '../match.module';
import { SaisonsService } from '../../saisonauswahl/saisons.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-match-details',
  imports: [CommonModule],
  templateUrl: './match-details.component.html',
  styleUrl: './match-details.component.css'
})
export class MatchDetailsComponent implements OnInit {
  kader: SpieltagskaderEintrag[] = [];
  startelf: SpieltagskaderEintrag[] = [];
  bank: SpieltagskaderEintrag[] = [];
  //@Input() matchData!: MatchData;
    constructor(private saisonService: SaisonsService, private route: ActivatedRoute) {}

    ngOnInit(): void {
      this.route.paramMap.subscribe((params: ParamMap) => {
        const saison = params.get('saison');
        const spieltag = params.get('spieltag');

        if (saison && spieltag) {
          console.log(`Lade Daten für Saison: ${saison}, Spieltag: ${spieltag}`);

          this.saisonService.getSpieltagskader(saison.replace('/', ''), spieltag).subscribe(
            (kaderArray: SpieltagskaderEintrag[]) => {
              //this.kader = kaderArray;  // 2. Das erhaltene Array speichern
              console.log('--- Kader Iteration ---');
              kaderArray.forEach(eintrag => {
                // Zugriff auf die Eigenschaften jedes Elements
                console.log(
                  `Spieler: ${eintrag.vorname} ${eintrag.nachname} | Gruppe: ${eintrag.gruppe} | Einsatz: ${eintrag.einsatz}`
                );
                
                // Hier können Sie komplexere Logik einfügen, z.B. das Filtern in Startelf/Bank:
                if (eintrag.gruppe.substring(0, 2) === '01') { this.startelf.push(eintrag);}
                if (eintrag.gruppe.substring(0, 2) === '02') { this.bank.push(eintrag);}
                if (eintrag.gruppe.substring(0, 2) === '03') { this.kader.push(eintrag);}
              });
              console.log('--- Iteration Ende ---');
            },
            (error) => {
              console.error('Fehler beim Laden des Spieltagskaders:', error);
            }
          );          

        } else {
          console.error('Saison oder Spieltag fehlen in der Route.');
          //this.isLoading = false;
        }
      });

    }


matchData: MatchData = {
    nameWir: { name: 'FC Meine Stadt', logoUrl: '/assets/logo-home.png' },
    nameGegner: { name: 'SV Gast', logoUrl: '/assets/logo-away.png' },
    toreWir: 3,
    toreGegner: 1,
    startelf: [
      { id: 1, nachname: 'Meier', vorname: 'Torwart' },
      { id: 2, nachname: 'Schulz', vorname: 'Abwehr' },
      { id: 3, nachname: 'Müller', vorname: 'Mittelfeld' },
      { id: 4, nachname: 'Weber', vorname: 'Sturm' },
    ],
    bank: [
      { id: 12, nachname: 'Schmidt', vorname: 'Abwehr' },
    ],
    kader: [
      { id: 20, nachname: 'Bauer', vorname: 'Mittelfeld' },
      { id: 21, nachname: 'Fischer', vorname: 'Sturm' },
    ],
    tore: [
      { minute: 15, nachname: 'Bauer', vorname: 'Mittelfeld', team: 'W' },
      { minute: 40, nachname: 'Kahn', vorname: 'Torwart', team: 'G' },
      { minute: 62, nachname: 'Weber', vorname: 'Sturm', team: 'W' },
      { minute: 88, nachname: 'Müller', vorname: 'Mittelfeld', team: 'W' },
    ]
  };
}
