import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-subdesign',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './subdesign.component.html',
  styleUrl: './subdesign.component.css'
})
export class SubdesignComponent implements OnInit {
  
  intervalId: any;
  public laufschrift: string = '';
  public laufschriftScrollAmount: number = 33;
  public laufschriftVisibility: boolean = false;  
  public hideLaufschrift: boolean = false;
  
  url: string = ConfigurationService.URL + '/spielstand';
  urlLaufschrift: string = this.url + '/laufschrift';

  @Input() designName!: string;
  @Input() toreHeim!: number;
  @Input() toreGast!: number;

  public constructor(private http: HttpClient) {  }  
  
  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      this.abfragen();
    }, 1000);
  }

  abfragen(){
    
    this.laufschriftVisibility = this.toreGast > 0 || this.toreHeim > 0;
    
    // Laufschrift vom Server abfragen
    this.http.get(this.urlLaufschrift, {responseType: 'text'}).subscribe((response) => {
      this.laufschrift = response;
    })
  }
}
