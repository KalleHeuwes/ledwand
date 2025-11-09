import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaisonsService } from 'src/app/historie/saisonauswahl/saisons.service';
import { Saison } from 'src/app/historie/saisonauswahl/saison';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { PerformanceGraphComponent } from 'src/app/historie/performance-graph/performance-graph.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seasons',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatMenuModule],
  templateUrl: './seasons.component.html'
})
export class SeasonsComponent implements OnInit {
  tableData: Saison[] = [];

  constructor(
    private saisonService: SaisonsService, 
    private router: Router,
    public dialog: MatDialog) {}

  ngOnInit() {
    this.saisonService.getSaisons("*").subscribe((data: Saison[]) => {
       this.tableData = data;
    });
  }

  openPerformanceDialog(): void {
    this.router.navigate(['/historie/performancegraph']);
    /*
    this.dialog.open(PerformanceGraphComponent, {
        // Konfiguration des Dialogs:
        width: '1500px', // Breite des Dialogfensters festlegen
        height: '700px', // Höhe des Dialogfensters festlegen
        maxWidth: 'none',
        autoFocus: false, // Optional: Verhindert, dass der Dialog den Fokus stiehlt
        data: { Hier könnten Sie Daten an die Dialog-Komponente übergeben  } 
    });
    */
}
}
