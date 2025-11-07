import { Component } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { SaisonsService } from '../saisonauswahl/saisons.service';

@Component({
  selector: 'app-performance-graph',
  imports: [NgxChartsModule],
  templateUrl: './performance-graph.component.html',
  styleUrl: './performance-graph.component.css'
})
export class PerformanceGraphComponent {
  constructor(private saisonService: SaisonsService) {}
  title = 'Performance-Entwicklung';

  performanceData = [
    {
      "name": "Performanceindex",
      "series": [
        { "name": "2021/22", "value": 314 },
        { "name": "2022/23", "value": 319 },
        { "name": "2022/24", "value": 322 },
        { "name": "2024/25", "value": 324 },
        { "name": "2025/26", "value": 419 } // Starker Anstieg in der aktuellen Saison
      ]
    }
  ];

  view: [number, number] = [900, 600]; // Breite und Höhe des Diagramms (kann auch null sein für responsive)

  // Optionen für das Liniendiagramm
  legend = true;        // Legende anzeigen
  showLabels = true;    // Labels auf Balken/Segmenten anzeigen
  animations = true;    // Animationen aktivieren
  xAxis = true;         // X-Achse anzeigen (Saison)
  yAxis = true;         // Y-Achse anzeigen (Index)
  showYAxisLabel = true;
  showXAxisLabel = true;
  xAxisLabel = 'Saison';
  yAxisLabel = 'Performanceindex';
  timeline = true;      // Timeline-Slider unter dem Diagramm (optional)

  // Farbschema festlegen (z.B. "vivid", "natural", "cool", "fire", "solar", "air")
  // Sie können auch ein benutzerdefiniertes Schema erstellen.
  colorScheme: string = 'vivid'; // Oder 'natural', 'cool', 'fire' etc.

  // Callback-Funktionen (optional, für Interaktivität)
  onSelect(data: any): void {
    console.log('Element ausgewählt', data);
  }

  ngOnInit(): void {
    console.log('PerformanceGraphComponent: ngOnInit');
    this.saisonService.getSaisons("*").subscribe(data => {
    const performanceData = data.map(item => ({
        saison: item.saison,
        pi: item.performanceindex
    }));
    
    console.log('Performance-Daten geladen:', performanceData);
    });
  }
}
