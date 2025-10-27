import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Saison } from './saison';
import { TeamPerformance } from './team-performance';
import { Spieltag } from './spieltag';
import { FileItem, SpieltagskaderEintrag, TorEreignis } from '../match/match.module';

@Injectable({
  providedIn: 'root'
})
export class SaisonsService {

  private urlSaisons = 'http://localhost:8080/api/historie/saisons';
  private urlSpielerliste = 'http://localhost:8080/api/historie/spielerliste';
  private urlAbschlusstabelle = 'http://localhost:8080/api/historie/abschlusstabelle/{saison}';
  private urlSpieltage = 'http://localhost:8080/api/historie/spieltage/{saison}';
  private urlSpiel = 'http://localhost:8080/api/historie/spieltag?saison={saison}&spieltag={spieltag}';
  private urlKader = 'http://localhost:8080/api/historie/spieltagskader?saison={saison}&spiel={spiel}';
  private urlDokumente = 'http://localhost:8080/api/historie/documents?typ={typ}&saison={saison}&spieltag={spieltag}';
  private aktuelleSaisonSubject = new BehaviorSubject<Saison | null>(null);

  constructor(private http: HttpClient) {}

  /** Liste aller Spieler im Kader eines Spieltags */
  getSpieltagskader(saison: string, spiel: string): Observable<SpieltagskaderEintrag[]> {
    const url = this.urlKader.replace('{saison}', saison).replace('{spiel}', spiel);
    return this.http.get<SpieltagskaderEintrag[]>(url);
  }

  /** Liste aller verfügbaren Saisons aus dem Backend laden */
  getSaisons(): Observable<Saison[]> {
    return this.http.get<Saison[]>(this.urlSaisons);
  }

  /** Abschlusstabelle einer Saison */
  getAbschlusstabelle(saison: string): Observable<TeamPerformance[]> {
    const url = this.urlAbschlusstabelle.replace('{saison}', saison.replace('/', ''));
    return this.http.get<TeamPerformance[]>(url);
  }

  /** Spieltage einer Saison */
  getSpielerliste(): Observable<string[]> {
    return this.http.get<string[]>(this.urlSpielerliste);
  }

  /** Spieltage einer Saison */
  getSpieltage(saison: string): Observable<Spieltag[]> {
    const url = this.urlSpieltage.replace('{saison}', saison.replace('/', ''));
    return this.http.get<Spieltag[]>(url);
  }

  /** Spieltag */
  getSpiel(saison: string, spieltag: number): Observable<Spieltag> {
    const url = this.urlSpiel.replace('{saison}', saison.replace('/', '')).replace('{spieltag}', spieltag.toString());
    return this.http.get<Spieltag>(url);
  }

  /** Dokumente (Torvideos, Berichte) */
  getDokumente(typ: string, saison: string, spieltag: string): Observable<FileItem[]> {
    const url = this.urlDokumente
      .replace('{typ}', typ)
      .replace('{saison}', saison.replace('/', ''))
      .replace('{spieltag}', spieltag);
    return this.http.get<FileItem[]>(url);
  }

  /** Aktuell gewählte Saison als Observable bereitstellen */
  getAktuelleSaison(): Observable<Saison | null> {
    return this.aktuelleSaisonSubject.asObservable();
  }

  /** Aktuelle Saison ändern */
  setAktuelleSaison(saison: Saison) {
    this.aktuelleSaisonSubject.next(saison);
  }

  /** Zugriff auf den aktuellen Wert (z. B. beim Initialisieren) */
  getAktuelleSaisonWert(): Saison | null {
    return this.aktuelleSaisonSubject.value;
  }

  erstelleTorreihenfolgeAlsArray(geschossen: string, kassiert: string): TorEreignis[] {
      // 1. Minuten und Torschützen (wenn vorhanden) parsen und Aktionen zuweisen
      const tore: { minute: number, torschuetze: string, istGeschossen: boolean }[] = [];

      // Geschossene Tore (Format: Minute|Schütze|Minute|Schütze|...)
      if (geschossen) {
          const teile = geschossen.split('|');
          for (let i = 0; i < teile.length; i += 2) {
              const minute = parseInt(teile[i].trim());
              const torschuetze = teile[i + 1] ? teile[i + 1].trim() : "";

              if (!isNaN(minute)) {
                  tore.push({ minute, torschuetze, istGeschossen: true });
              }
          }
      }

      // Kassierte Tore (Format: Minute|Minute|...)
      if (kassiert) {
          kassiert.split('|').forEach(minStr => {
              const minute = parseInt(minStr.trim());
              if (!isNaN(minute)) {
                  // Bei kassierten Toren ist der Schütze leer
                  tore.push({ minute, torschuetze: "", istGeschossen: false });
              }
          });
      }

      // 2. Nach Minute sortieren
      tore.sort((a, b) => a.minute - b.minute);

      // 3. Ergebnis-Array erstellen und Spielstand berechnen
      const ergebnisArray: TorEreignis[] = [];
      let bilanzGeschossen = 0;
      let bilanzKassiert = 0;

      for (const tor of tore) {
          if (tor.istGeschossen) {
              bilanzGeschossen++;
          } else {
              bilanzKassiert++;
          }

          const spielstand = `${bilanzGeschossen}:${bilanzKassiert}`;
          const team = tor.istGeschossen ? 'W' : 'G';
          const torschuetze = tor.istGeschossen ? tor.torschuetze : "";

          ergebnisArray.push({
              minute: tor.minute,
              spielstand: spielstand,
              torschuetze: torschuetze,
              team: team,
              videourl: ''
          });
      }

      return ergebnisArray;
  }
}
