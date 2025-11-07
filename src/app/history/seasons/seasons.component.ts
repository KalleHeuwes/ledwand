import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaisonsService } from 'src/app/historie/saisonauswahl/saisons.service';
import { Saison } from 'src/app/historie/saisonauswahl/saison';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { PerformanceGraphComponent } from 'src/app/historie/performance-graph/performance-graph.component';

@Component({
  selector: 'app-seasons',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './seasons.component.html'
})
export class SeasonsComponent implements OnInit {
  tableData: Saison[] = [];

  constructor(private saisonService: SaisonsService, public dialog: MatDialog) {}

  ngOnInit() {
    this.saisonService.getSaisons("*").subscribe((data: Saison[]) => {
       this.tableData = data;
    });
  }

  openPerformanceDialog(): void {
    this.dialog.open(PerformanceGraphComponent, {
        // Konfiguration des Dialogs:
        width: '1200px', // Breite des Dialogfensters festlegen
        height: '1200px', // Höhe des Dialogfensters festlegen
        autoFocus: false, // Optional: Verhindert, dass der Dialog den Fokus stiehlt
        data: { /* Hier könnten Sie Daten an die Dialog-Komponente übergeben */ } 
    });
}
}
