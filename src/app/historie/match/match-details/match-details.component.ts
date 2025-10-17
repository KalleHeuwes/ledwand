import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatchData, SpieltagskaderEintrag, TorEreignis } from '../match.module';
import { SaisonsService } from '../../saisonauswahl/saisons.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Spieltag } from '../../saisonauswahl/spieltag';

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
  toreWir: number = 0;
  toreGegner: number = 0;
  nameGegner: string = 'SV Gast';
  logoGegner: string = '/assets/pictures/teams/SV_Mesum.svg';
  nameWir: string = 'FC Meine Stadt';
  logoWir: string = '/assets/pictures/teams/logo_sve.png';
  toreStrWir: string = '';
  toreStrGegner: string = '';
  toreReihenfolge: TorEreignis[] = [];
  saison: string = '';
  spiel: number = 0;
  //isLoading: boolean = true;
  //@Input() matchData!: MatchData;

  //isLoading: boolean = true;
  //@Input() matchData!: MatchData;
    constructor(private saisonService: SaisonsService, private route: ActivatedRoute, private router: Router) {}

    ngOnInit(): void {
      this.route.paramMap.subscribe((params: ParamMap) => {
        const saison = params.get('saison');
        const spieltag = params.get('spieltag');
        this.spiel = parseInt(spieltag?.toString() || '0');
        this.saison = saison?.toString() || '';

        if (saison && spieltag) {
          console.log(`Lade Daten für Saison: ${saison}, Spieltag: ${spieltag}`);

          this.saisonService.getSpiel(saison.replace('/', ''), parseInt(spieltag)).subscribe(
            (spiel: Spieltag) => {
              this.toreWir = spiel.ergebnis.substring(0, spiel.ergebnis.indexOf(':')) as unknown as number;
              this.toreGegner = spiel.ergebnis.substring(spiel.ergebnis.indexOf(':') + 1) as unknown as number;
              this.nameGegner = spiel.gegner;
              this.nameWir = 'SpVg Emsdetten 05';
              this.toreStrWir = spiel.geschossen;
              this.toreStrGegner = spiel.kassiert;
              this.toreReihenfolge = this.saisonService.erstelleTorreihenfolgeAlsArray(spiel.geschossen, spiel.kassiert);
              //this.isLoading = false;
            },
            (error) => {
              console.error('Fehler beim Laden des Spiels:', error);
            }
          );        

          this.saisonService.getSpieltagskader(saison.replace('/', ''), spieltag).subscribe(
            (kaderArray: SpieltagskaderEintrag[]) => {
              //this.kader = kaderArray;  // 2. Das erhaltene Array speichern
              console.log('--- Kader Iteration ---');
              this.startelf = [];
              this.bank = [];
              this.kader = [];
              // 3. Iteration über das Array
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

    menu(){
      this.router.navigate(['/historie']);
    }

    spieltagWechseln(richtung: number) {
        const neueSpiel = this.spiel + richtung;
        if(neueSpiel < 1) {
            return; // Verhindert Wechsel zu Spieltag < 1
        }
        this.router.navigate(['/spiel', this.saison, neueSpiel]);
    }
}
