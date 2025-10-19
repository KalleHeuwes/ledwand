import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadService } from '../../services/upload.service';

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
    this.adminService.startDataImport().subscribe({
      next: (response) => { this.importStatus = response; },
      error: (error) => { this.importStatus = `FEHLER beim Import: ${error.error}`; },
      complete: () => { this.isImporting = false; }
    });
  }
}
