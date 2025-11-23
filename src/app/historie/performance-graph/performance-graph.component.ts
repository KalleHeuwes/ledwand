import { Component, ChangeDetectorRef, EnvironmentInjector, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule, TooltipService } from '@swimlane/ngx-charts';
import { SaisonsService } from '../saisonauswahl/saisons.service';
import { OverlayModule } from '@angular/cdk/overlay';
import { Router } from '@angular/router';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatMenuModule } from '@angular/material/menu';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-performance-graph',
  imports: [NgxChartsModule, OverlayModule, CommonModule, MatDivider, MatMenuModule],
  templateUrl: './performance-graph.component.html',
  styleUrl: './performance-graph.component.css',
  providers: [TooltipService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PerformanceGraphComponent {
  @ViewChild(MatMenuTrigger) contextMenuTrigger: MatMenuTrigger | undefined;
  public performanceData: any[] = [];
  constructor(
    private saisonService: SaisonsService, 
    private router: Router,
    private cdr: ChangeDetectorRef,
    private environmentInjector: EnvironmentInjector
  ) {}
  title = 'Performance-Entwicklung';
  public selectedSaison: string | null = null;
  view: [number, number] = [1500, 600]; // Breite und Höhe des Diagramms (kann auch null sein für responsive)

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

  onSelect(data: any): void {
      console.log('Datenpunkt ausgewählt', data);

      // Die Struktur des zurückgegebenen Objekts hängt vom Diagrammtyp ab:
      if (data && data.name) {
          this.selectedSaison = data.name; // 'name' ist die Saison (z.B. "2024/25")
      } else {
          // Dies tritt auf, wenn auf die Legende oder eine leere Stelle geklickt wird
          this.selectedSaison = null;
      }
      this.contextMenuTrigger?.openMenu();
  }

  ngOnInit(): void {
    console.log('PerformanceGraphComponent: ngOnInit');
    this.saisonService.getSaisons("*").subscribe(data => {
      console.table(data);
      const validData = data.filter(item => 
          item.saison !== null && item.saison !== undefined && 
          item.performanceIndex !== null && item.performanceIndex !== undefined
      );

      // 2. Mapping
      const chartSeries = validData.map(item => ({
          name: item.saison.toString(), 
          value: Number(item.performanceIndex) 
      }));
      
      // Sortierung nach dem 'name'-Feld (Saison) aufsteigend
      chartSeries.sort((a, b) => {
          if (a.name < b.name) { return -1; }// a kommt vor b          }
          if (a.name > b.name) { return  1; } // b kommt vor a
          return 0; // die Namen sind gleich
      });

      console.log('Performance-Daten geladen:', chartSeries);
      this.performanceData = [
        {
          "name": "Performanceindex V2",
          "series": chartSeries
        }
      ];
      this.cdr.detectChanges(); // Stellt sicher, dass die Ansicht aktualisiert wird

    });
  }

  // Fügen Sie diese Methode Ihrer Component-Klasse hinzu
  xAxisTickFormatting(val: any): string {
      // Stellen Sie sicher, dass der Wert existiert und ein String ist, bevor Sie ihn zurückgeben
      if (val) {
          // Da 'saison' ein String wie "2021/22" ist, geben Sie ihn direkt zurück
          return val.toString(); 
      }
      // Wenn val undefined oder null ist, geben Sie einen leeren String zurück
      return ''; 
  }

  navigateToAbschlusstabelle(): void {
    if (this.selectedSaison) {
      this.router.navigate(['historie', 'abschlusstabellen', this.selectedSaison]);
      console.log(`Navigiere zu: historie/abschluss/${this.selectedSaison}`);
    }
  }

  /**
   * Navigiert zur Detailseite der Spiele.
   */
  navigateToSpiele(): void {
    if (this.selectedSaison) {
      this.router.navigate(['historie', 'spiele', this.selectedSaison]);
      console.log(`Navigiere zu: historie/spiele/${this.selectedSaison}`);
    }
  }
}
