export interface Statuseintrag {
    id: number;
    typ: String;
    spielminute: number;
    hg: string;
    rueckennumer: number;
    spielername: String;
    zusatz: String;
}

/*
    # Statuseintrag
    Attribut        TH      TG      BV
    Typ             'T'     'T'     'RK' | 'EV'
    Minute          x       x       x
    Für wen         'H'     'G'     'H' | 'G'
    Rückennumer     x       -       x
    Spielername     x       -       -
    Zusatz          x       x       -
*/