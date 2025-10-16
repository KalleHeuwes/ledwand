// match.model.ts

export interface Spieler {
  nachname: string;
  vorname: string;
}

export interface Tor {
  minute: number;
  nachname: string;
  vorname: string;
  team: 'W' | 'G' | 'ET' | 'ETG'; // W = Wir, G = Gegner, ET = Eigentor, ETG = Eigentor Gegner
}

export interface Team {
  name: string;
  logoUrl: string;
}

export interface MatchData {
  nameWir: Team;
  nameGegner: Team;
  toreWir: number;
  toreGegner: number;
  startelf: Spieler[];
  bank: Spieler[];
  kader: Spieler[]; // Spieler im Kader, die nicht eingesetzt wurden
  tore: Tor[];
}