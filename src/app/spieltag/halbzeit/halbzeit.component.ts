import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigurationService } from '../../services/configuration.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-halbzeit',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './halbzeit.component.html',
  styleUrl: './halbzeit.component.css'
})
export class HalbzeitComponent implements OnInit {
  intervalId: any;
  public medien: String[] = [];
  public typen: String[] = [];
  anzahl: number = 0;
  zaehler: number = 0;

  public constructor(private http: HttpClient) {  }

  ngOnInit(): void {
    console.log('* HalbzeitComponent.ngOnInit ');
    this.configAuslesen();
    this.intervalId = setInterval(() => {
      if(this.medien.length > 0){
        this.zaehler++;
        if(this.zaehler >= this.medien.length){
          this.zaehler = 0;
        }
      }else{
        this.zaehler = -1;
      }
    }, 2000);
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
          }
        }
        
      }
    });

  }
}
