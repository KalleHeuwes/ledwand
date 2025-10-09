import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Saison } from './saison';

@Injectable({
  providedIn: 'root'
})
export class SaisonsService {

  private baseUrl = 'http://localhost:8080/historie/saisons';
  private aktuelleSaisonSubject = new BehaviorSubject<Saison | null>(null);

  constructor(private http: HttpClient) {}

  /** Liste aller verfügbaren Saisons aus dem Backend laden */
  getSaisons(): Observable<Saison[]> {
    const ret: Observable<Saison[]> = this.http.get<Saison[]>(this.baseUrl);
    console.log('SaisonsService: Saisons geladen');
    ret.subscribe(saisons => console.table(saisons));
    return ret;
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
