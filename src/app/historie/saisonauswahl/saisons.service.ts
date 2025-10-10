import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Saison } from './saison';
import { TeamPerformance } from './team-performance';
import { Spieltag } from './spieltag';

@Injectable({
  providedIn: 'root'
})
export class SaisonsService {

  private baseUrl = 'http://localhost:8080/api/historie/saisons';
  private urlAbschlusstabelle = 'http://localhost:8080/api/historie/abschlusstabelle/{saison}';
  private urlSpieltage = 'http://localhost:8080/api/historie/spieltage/{saison}';
  private aktuelleSaisonSubject = new BehaviorSubject<Saison | null>(null);

  constructor(private http: HttpClient) {}

  /** Liste aller verfügbaren Saisons aus dem Backend laden */
  getSaisons(): Observable<Saison[]> {
    //const ret: Observable<Saison[]> = this.http.get<Saison[]>(this.baseUrl);
    //console.log('SaisonsService: Saisons geladen');
    //ret.subscribe(saisons => console.table(saisons));
    return this.http.get<Saison[]>(this.baseUrl);
  }

  /** Abschlusstabelle einer Saison */
  getAbschlusstabelle(saison: string): Observable<TeamPerformance[]> {
    const url = this.urlAbschlusstabelle.replace('{saison}', saison.replace('/', ''));
    return this.http.get<TeamPerformance[]>(url);
  }

  /** Spieltage einer Saison */
  getSpieltage(saison: string): Observable<Spieltag[]> {
    const url = this.urlSpieltage.replace('{saison}', saison.replace('/', ''));
    return this.http.get<Spieltag[]>(url);
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
}
