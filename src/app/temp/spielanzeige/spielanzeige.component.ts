import { Component, OnInit } from '@angular/core';
import { PerformanceGraphComponent } from 'src/app/historie/performance-graph/performance-graph.component';

@Component({
  selector: 'app-spielanzeige',
  templateUrl: './spielanzeige.component.html',
  styleUrls: ['./spielanzeige.component.css'],
  standalone: true,
  imports: [PerformanceGraphComponent]
})
export class SpielanzeigeComponent implements OnInit {
  aktuelleMinute: number = 0;
  aktuelleUhrzeit: string = '';
  spielstand: string = '1 : 0';
  torschuetzen: string[] = [
    '12. Min: Müller (1:0)',
    '47. Min: Schulz (2:0)',
    '59. Min: Meier (2:1)',
  ];

  tickerText: string = '';

  ngOnInit(): void {
    this.updateUhrzeit();
    setInterval(() => this.updateUhrzeit(), 1000);

    this.updateTicker();
    setInterval(() => this.updateTicker(), 5000);
  }

  updateUhrzeit(): void {
    const now = new Date();
    this.aktuelleUhrzeit = now.toLocaleTimeString();
    this.aktuelleMinute = Math.floor((now.getTime() - new Date().setHours(8, 30, 0, 0)) / 60000);
  }

  updateTicker(): void {
    this.tickerText = this.torschuetzen.join(' ⚽ ');
  }
}
