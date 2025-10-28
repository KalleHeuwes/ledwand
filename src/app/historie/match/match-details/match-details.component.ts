import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { forkJoin, Observable } from 'rxjs';
import { SpieltagskaderEintrag, TorEreignis, FileItem } from '../match.module';
import { SaisonsService } from '../../saisonauswahl/saisons.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Spieltag } from '../../saisonauswahl/spieltag';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'; // <-- Wichtig!
import { TableOfPlayersComponent } from './table-of-players/table-of-players.component';
import { TableOfDocsComponent } from './table-of-docs/table-of-docs.component';
import { TableOfGoalsComponent } from './table-of-goals/table-of-goals.component';

@Component({
  selector: 'app-match-details',
  imports: [CommonModule, TableOfPlayersComponent, TableOfDocsComponent, TableOfGoalsComponent, MatIconModule],
  templateUrl: './match-details.component.html',
  styleUrl: './match-details.component.css'
})
export class MatchDetailsComponent implements OnInit {
  kader: SpieltagskaderEintrag[] = [];
  startelf: SpieltagskaderEintrag[] = [];
  bank: SpieltagskaderEintrag[] = [];
  dokumente: FileItem[] = [];
  fotos: FileItem[] = [];
  torvideos: FileItem[] = [];
  toreHeim: number = 0;
  toreGast: number = 0;
  nameHeim: string = '';
  nameGast: string = '';
  nameGegner: string = '';
  logoGast: string = '';
  logoHeim: string = '';
  toreReihenfolge: TorEreignis[] = [];
  saison: string = '';
  spiel: number = 0;
  evbaelleFile: { path: string; name: string; type: string } = { path: './Saison2526/EV-Bälle/Saison2526_02_Bälle.png', name: 'Saison2526_02_Bälle.png', type: 'png' };
  selectedFileUrl: SafeResourceUrl | null = null; // Die sichere URL für den iFrame

  constructor(
    private saisonService: SaisonsService, 
    private route: ActivatedRoute, 
    private router: Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const saison = params.get('saison');
      const spieltag = params.get('spieltag');
      this.spiel = parseInt(spieltag?.toString() || '0');
      this.saison = saison?.toString() || '';
      const saison4 = this.saison.replace('/', '').substring(2, 6);
      const spieltag2 = spieltag?.toString().padStart(2, '0') || '';

      if (saison && spieltag) {
        console.log(`Lade Daten für Saison: ${saison}, Spieltag: ${spieltag}`);
        this.evbaelleFile = { 
          path: './Saison' + saison4 + '/EV-Bälle/Saison' + saison4 + '_' + spieltag2 + '_Bälle.png', 
          name: 'Saison' + saison4 + '_' + spieltag2 + '_Bälle.png', 
          type: 'png' };

        const query1$: Observable<Spieltag> = this.saisonService.getSpiel(saison.replace('/', ''), parseInt(spieltag));        

        this.saisonService.getSpieltagskader(saison.replace('/', ''), spieltag).subscribe(
          (kaderArray: SpieltagskaderEintrag[]) => {
            this.startelf = [];
            this.bank = [];
            this.kader = [];
            kaderArray.forEach(eintrag => {
              if (eintrag.gruppe.substring(0, 2) === '01') { this.startelf.push(eintrag);}
              if (eintrag.gruppe.substring(0, 2) === '02') { this.bank.push(eintrag);}
              if (eintrag.gruppe.substring(0, 2) === '03') { this.kader.push(eintrag);}
            });
          },
          (error) => { console.error('Fehler beim Laden des Spieltagskaders:', error); }
        );          

        this.saisonService.getDokumente('Dokumente', saison.replace('/', ''), spieltag2).subscribe(
          (docs: FileItem[]) => {
            this.dokumente = [];
            docs.forEach(eintrag => {this.dokumente.push(eintrag); });
          },
          (error) => { console.error('Fehler beim Laden der Dokumente:', error); }
        ); 

        const query2$: Observable<FileItem[]> = this.saisonService.getDokumente('Torvideos', saison.replace('/', ''), spieltag2); 

        this.saisonService.getDokumente('Fotos', saison.replace('/', ''), spieltag2).subscribe(
          (dokumente: FileItem[]) => {
            this.fotos = [];
            dokumente.forEach(eintrag => {this.fotos.push(eintrag); });
          },
          (error) => { console.error('Fehler beim Laden der Fotos:', error); }
        ); 

        forkJoin({ spiel: query1$, torvideos: query2$ }).subscribe({
          next: (results) => {            
            console.log('Alle Backend-Abfragen fertig:', results);  // 'results' = Ergebnisse, results.spiel, results.torvideos
            this.nachbearbeitung(results.spiel, results.torvideos); // Nachbearbeitung
          },
          error: (err) => { console.error('Fehler bei einer der Abfragen:', err); }
        });
      } else {console.error('Saison oder Spieltag fehlen in der Route.');}
    });
  }

  nachbearbeitung(spiel: Spieltag, torvideos: FileItem[]): void {
    let heimspiel = (spiel.heimOderAuswaerts === 'H');
    let toreVorne = spiel.ergebnis.substring(0, spiel.ergebnis.indexOf(':')) as unknown as number;
    let toreHinten = spiel.ergebnis.substring(spiel.ergebnis.indexOf(':') + 1) as unknown as number;
    this.toreHeim = (heimspiel) ? toreVorne : toreHinten;
    this.toreGast = (heimspiel) ? toreHinten : toreVorne;
    this.nameHeim = (heimspiel) ? 'SpVg Emsdetten 05' : spiel.gegner;
    this.nameGast = (heimspiel) ? spiel.gegner : 'SpVg Emsdetten 05';
    this.nameGegner = spiel.gegner;    
    this.logoHeim = (heimspiel) ? '/assets/pictures/teams/logo_sve.png' : '/assets/pictures/teams/NichtGefunden.svg';
    this.logoGast = (heimspiel) ? '/assets/pictures/teams/NichtGefunden.svg' : '/assets/pictures/teams/logo_sve.png';
    this.toreReihenfolge = this.saisonService.erstelleTorreihenfolgeAlsArray(spiel.geschossen, spiel.kassiert);
    //this.isLoading = false;
    this.torvideos = [];
    torvideos.forEach(eintrag => {this.torvideos.push(eintrag); });
    this.assignVideoUrls();
  }

  assignVideoUrls(){
    this.toreReihenfolge.forEach(tor => {
      const matchingVideo = this.torvideos.find(
        video => {
          return video.fileName.replace('-', ':').includes(tor.spielstand)
        }
      );

      if (matchingVideo) {
        const encodedPath = encodeURIComponent(matchingVideo.filePath.toString());
        const fullUrl = `http://localhost:8080/api/files/download?filePath=${encodedPath}`;
        tor.videourl = fullUrl;
      }
    });
  }

  /**
    * Erzeugt die sichere URL für den PDF-Download und die Anzeige.
  * @param filePath Der relative Pfad der Datei.
  */
  openFile(filePath: String): void {
    const encodedPath = encodeURIComponent(filePath.toString());
    const fullUrl = `http://localhost:8080/api/files/download?filePath=${encodedPath}`;
    window.open(fullUrl, '_blank');

    // 3. Den DomSanitizer verwenden, um die URL für den iFrame als sicher zu markieren
    // Dies ist zwingend erforderlich, da Angular iFrames standardmäßig aus Sicherheitsgründen blockiert.
    //this.selectedFileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(fullUrl);
  }

  menu(){ this.router.navigate(['/historie']); }

  spieltagWechseln(richtung: number) {
      const neuesSpiel = this.spiel + richtung;
      if(neuesSpiel < 1) { return; } // Verhindert Wechsel zu Spieltag < 1
      this.router.navigate(['/spiel', this.saison, neuesSpiel]);
  }
}
