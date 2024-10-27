import { Component, OnInit } from '@angular/core';
import { Player } from '../models/player';
import { HttpClient } from '@angular/common/http';
import { UploadService } from '../services/upload.service';
import { SpieltagsConfig } from '../models/spieltags-config';
import { SpieltagsConfigService } from '../services/spieltags-config.service';

@Component({
  selector: 'app-checkitout',
  standalone: true,
  imports: [],
  templateUrl: './checkitout.component.html',
  styleUrl: './checkitout.component.css'
})
export class CheckitoutComponent implements OnInit {

  public config!: SpieltagsConfig;
  public startelf: Player[] = [];
  public bank: Player[] = [];
  public message!: string;
  public datum: string = "";
  public gegner: string = "";
  public gegnerBild: string = "";

  public constructor(private http: HttpClient, 
    private uploadService: UploadService, 
    private spieltagsConfigService: SpieltagsConfigService) {
    
  }

  file: File | undefined;

  
  onFilechange(event: any) {
    console.log(event.target.files[0])
    this.file = event.target.files[0]
  }
  
  upload() {
    if (this.file) {
      this.uploadService.uploadfile(this.file).subscribe(resp => {
        alert("Uploaded")
      })
    } else {
      alert("Please select a file first")
    }
  }


  ngOnInit(): void {
    //throw new Error('Method not implemented.');
  }
  
  aufstellungAuslesen(){
    console.log("Aufstellung auslesen ...");
    
    const url: string = '/assets/aufstellung.csv';

    this.http.get(url, {responseType: 'text'}).subscribe((response) => {

      let csvToRowArray = response.split("\n");
      console.log("* Anzahl " +csvToRowArray.length);
      let modus = '';
      this.startelf = [];
      this.bank = [];
      for (let index = 0; index <= csvToRowArray.length - 1; index++) {
        let rowStr = csvToRowArray[index];
        if(rowStr.startsWith('#Spiel'))   {       modus = 'G';      };
        if(rowStr.startsWith('#Startelf')){       modus = 'S';      };
        if(rowStr.startsWith('#Bank'))    {       modus = 'B';      };
        if(!rowStr.startsWith('#')){
          let row = rowStr.split(";");
          if(modus === 'S' || modus==='B'){
            console.log(modus + " * Spieler " + row[1]);
            let player1 = new Player( parseInt( row[0], 10), row[1], row[2].trim(), '');
            if(modus==='S') { this.startelf.push(player1);}
            if(modus==='B') { this.bank.push    (player1);}
          }
          if(modus === 'G'){
            if(row[1] === "Datum") this.datum = row[2];
            if(row[1] === "Gegner") this.gegner = row[2];
            if(row[1] === "Bild") this.gegnerBild = row[2];
          }
        }
      }
      console.log('* Startelf *');
      console.log(this.startelf);
      console.log('* Bank *');
      console.log(this.bank);
      this.message = "Anzahl gelesene: " + csvToRowArray.length; 

    }
  )
  
  }  
  
  aufstellungAuslesenService(){
    console.log("Aufstellung auslesen ...");
    
    console.log("Dummy: " + this.spieltagsConfigService.dummy());
    this.config = this.spieltagsConfigService.auslesen();
    console.log("Anz: " + this.config.startelf.length);
  }
}
