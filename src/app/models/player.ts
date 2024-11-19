export class Player{
    id: number;
    name1: String;
    name2: String;
    pic: String;
    spiele: number = 0;
    minuten: number = 0;
    tore: number = 0;
  
    constructor(id: number, name1: String, name2: String, pic: String){
      this.id = id;
      this.name1 = name1;
      this.name2 = name2;
      this.pic = pic;
    }

    setStatistik(spiele: number, minuten: number, tore: number){
      this.spiele = spiele;
      this.minuten = minuten;
      this.tore = tore;
    }
  
  }
  
