export interface Spieltage {
  id: number;
  saison: string;
  spieltag: number;
  datum: string;         // wird als ISO-String vom Backend geliefert
  heimOderAuswaerts: string;
  gegner: string;
  ergebnis: string;
  punkte: number;
  platz: number;
  geschossen: string;
  kassiert: string;
}
