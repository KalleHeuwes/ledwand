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
  abfragen: { name: string, url: string }[] = [
    { name: "Datenbank verwalten", url: "http://localhost:8080/h2-console" },
    { name: "Spieltage anzeigen", url: "http://localhost:8080/api/historie/spieltage/202223" },
    { name: "Spieltagskader anzeigen", url: "http://localhost:8080/api/historie/spieltagskader?saison=202425&spiel=1" },
    { name: "EV-Bälle", url: "http://localhost:8080/api/files/download?filePath=./Saison2526/EV-B%C3%A4lle/Saison2526_03_B%C3%A4lle.png" },
    { name: "Spielzeiten mit Dokumenten", url: "http://localhost:8080/api/historie/documents/saisons" },
    { name: "Torvideos", url: "http://localhost:8080/api/historie/documents?typ=Torvideos&saison=2526&spieltag=01" },
    { name: "Dokumente", url: "http://localhost:8080/api/historie/documents?typ=Dokumente&saison=2526&spieltag=01" },
    { name: "Einsätze eines Spielers", url: "http://localhost:8080/api/historie/einsaetze?nachname=Heinz&vorname=Merlin" }
  ];
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
