import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpieltagskaderEintrag, TorEreignis, FileItem } from '../match.module';
import { SaisonsService } from '../../saisonauswahl/saisons.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Spieltag } from '../../saisonauswahl/spieltag';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'; // <-- Wichtig!

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
  dokumente: FileItem[] = [];
  torvideos: FileItem[] = [];
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
  selectedFile: { path: string; name: string; type: string } = { path: './Saison2526/EV-Bälle/Saison2526_02_Bälle.png', name: 'Saison2526_02_Bälle.png', type: 'png' };
  selectedFileUrl: SafeResourceUrl | null = null; // Die sichere URL für den iFrame

  constructor(
    private sanitizer: DomSanitizer, 
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
          this.selectedFile = { 
            path: './Saison' + saison4 + '/EV-Bälle/Saison' + saison4 + '_' + spieltag2 + '_Bälle.png', 
            name: 'Saison' + saison4 + '_' + spieltag2 + '_Bälle.png', 
            type: 'png' };

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
              this.startelf = [];
              this.bank = [];
              this.kader = [];
              kaderArray.forEach(eintrag => {
                if (eintrag.gruppe.substring(0, 2) === '01') { this.startelf.push(eintrag);}
                if (eintrag.gruppe.substring(0, 2) === '02') { this.bank.push(eintrag);}
                if (eintrag.gruppe.substring(0, 2) === '03') { this.kader.push(eintrag);}
              });
            },
            (error) => {
              console.error('Fehler beim Laden des Spieltagskaders:', error);
            }
          );          

          this.saisonService.getDokumente('Dokumente', saison.replace('/', ''), spieltag2).subscribe(
            (docs: FileItem[]) => {
              this.dokumente = [];
              docs.forEach(eintrag => {this.dokumente.push(eintrag); });
            },
            (error) => { console.error('Fehler beim Laden der Dokumente:', error); }
          ); 

          this.saisonService.getDokumente('Torvideos', saison.replace('/', ''), spieltag2).subscribe(
            (dokumente: FileItem[]) => {
              this.torvideos = [];
              dokumente.forEach(eintrag => {this.torvideos.push(eintrag); });
            },
            (error) => { console.error('Fehler beim Laden der Torvideos:', error); }
          ); 
        } else {console.error('Saison oder Spieltag fehlen in der Route.');}
      });

    }

    /**
      * Erzeugt die sichere URL für den PDF-Download und die Anzeige.
    * @param filePath Der relative Pfad der Datei.
    */
    openFile(filePath: String): void {
      
      // 1. URI-Codierung des Pfadparameters
      const encodedPath = encodeURIComponent(filePath.toString());
      
      // 2. Erstellung der vollständigen URL zum Backend-Endpunkt
      const fullUrl = `http://localhost:8080/api/files/download?filePath=${encodedPath}`;
      window.open(fullUrl, '_blank');

      // 3. Den DomSanitizer verwenden, um die URL für den iFrame als sicher zu markieren
      // Dies ist zwingend erforderlich, da Angular iFrames standardmäßig aus Sicherheitsgründen blockiert.
      //this.selectedFileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(fullUrl);
    }

    menu(){ this.router.navigate(['/historie']); }

    spieltagWechseln(richtung: number) {
        const neueSpiel = this.spiel + richtung;
        if(neueSpiel < 1) {
            return; // Verhindert Wechsel zu Spieltag < 1
        }
        this.router.navigate(['/spiel', this.saison, neueSpiel]);
    }
}
