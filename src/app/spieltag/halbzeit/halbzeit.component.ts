import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigurationService } from '../../services/configuration.service';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-halbzeit',
    imports: [CommonModule],
    templateUrl: './halbzeit.component.html',
    styleUrl: './halbzeit.component.css'
})
export class HalbzeitComponent implements OnInit {
  intervalId: any;
  public medien: String[] = [];
  public typen: String[] = [];
  public dauer: number[] = [];
  public breite: number[] = [];
  public hoehe: number[] = [];
  anzahl: number = 0;
  medienIndex: number = 0;
  counter: number = 0;

  public constructor(private http: HttpClient) {  }

  ngOnInit(): void {
    console.log('* HalbzeitComponent.ngOnInit ');
    this.configAuslesen();
    this.intervalId = setInterval(() => {
      this.counter++;
      if(this.medien.length > 0){
        if(this.counter >= this.dauer[this.medienIndex]){
          this.medienIndex++;
          if(this.medienIndex >= this.medien.length){
            this.medienIndex = 0;
          }
          this.counter = 0;
        }
      }else{
        this.medienIndex = -1;
      }
    }, 1000);
  }

  configAuslesen(){
    this.http.get(ConfigurationService.URL + '/matches/matchday/halbzeit-config', {responseType: 'text'}).subscribe((r) => {
      if(r!== null){
        //console.log("Config auslesen ... ");
        var data = JSON.parse(r);
        for (let index = 0; index < data.length; index++) {
          const el = data[index];
          if(!el.startsWith('#')){
            console.log(" * " + el);
            let items = el.split(';');
            this.typen.push(items[0]);
            this.medien.push(items[1]);
            this.dauer.push(items[2]);
            this.breite.push(items[3]);
            this.hoehe.push(items[4]);
          }
        }
        
      }
    });

  }

  restlaufzeit(){
    return this.dauer[this.medienIndex] - this.counter;
  }
}
