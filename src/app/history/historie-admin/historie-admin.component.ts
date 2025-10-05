import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadService } from '../../services/upload.service'; // Pfad anpassen

@Component({
  selector: 'app-historie-admin',
  imports: [CommonModule],
  templateUrl: './historie-admin.component.html',
  styleUrl: './historie-admin.component.css'
})
export class HistorieAdminComponent {
importStatus: string = 'Bereit zum Starten des Imports.';
  isImporting: boolean = false;

  constructor(private adminService: UploadService) { }

  triggerImport() {
    this.isImporting = true;
    console.log('Datenimport wird gestartet...');
    this.importStatus = 'Datenimport wird gestartet...';

    // 1. Die Service-Methode aufrufen
    this.adminService.startDataImport().subscribe({
      
      // 2. Erfolg: Die Rückmeldung vom Backend erhalten (z.B. "Datenimport erfolgreich...")
      next: (response) => {
        this.importStatus = response;
        console.log('Import erfolgreich:', response);
      },
      
      // 3. Fehler: Fehlerbehandlung (z.B. bei 500 Internal Server Error)
      error: (error) => {
        this.importStatus = `FEHLER beim Import: ${error.error}`;
        console.error('Importfehler:', error);
      },
      
      // 4. Abschluss
      complete: () => {
        this.isImporting = false;
      }
    });
  }
}
