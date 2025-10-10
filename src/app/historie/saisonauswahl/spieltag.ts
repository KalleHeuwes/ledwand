export interface Spieltag {
    id: number;
    saison: string;
    spieltag: number;
    datum: string;         
    heimOderAuswaerts: string;
    gegner: string;
    ergebnis: string;
    punkte: number;
    platz: number;
    geschossen: string;
    kassiert: string;
}