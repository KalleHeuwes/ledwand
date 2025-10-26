// match.model.ts

export interface Spieler {
  id: number;
  nachname: string;
  vorname: string;
}

export interface TorEreignis {
  minute: number;
  spielstand: string;
  torschuetze: string;
  team: 'W' | 'G' | 'ET' | 'ETG'; // W = Wir, G = Gegner, ET = Eigentor, ETG = Eigentor Gegner
  videourl: string;
}

export interface Team {
  name: string;
  logoUrl: string;
}

export interface FileItem {
  fileName: string;
  filePath: string;
  typ: string;
}
export interface SpieltagskaderEintrag {
    id: number;
    saison: string;
    spiel: string;
    nachname: string;
    vorname: string;
    einsatz: string;
    gruppe: string;
}

export interface MatchData {
  nameWir: Team;
  nameGegner: Team;
  toreWir: number;
  toreGegner: number;
  startelf: Spieler[];
  bank: Spieler[];
  kader: Spieler[]; // Spieler im Kader, die nicht eingesetzt wurden
  tore: TorEreignis[];
}