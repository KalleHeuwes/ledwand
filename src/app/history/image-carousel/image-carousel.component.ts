import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaisonsService } from 'src/app/historie/saisonauswahl/saisons.service';

interface CarouselImage {
  url: string;
  filename: string;
  spieltag: string;
}
@Component({
  selector: 'app-image-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-carousel.component.html',
  styleUrls: ['./image-carousel.component.css']
})
export class ImageCarouselComponent implements OnChanges {
  @Input() spielerkurz: string = '';
  constructor(private saisonService: SaisonsService) {}

  // Die Rohdaten aus deinem Array
  rawPaths: string[] = [];

  // Dieses Array hält die für den Browser lesbaren URLs
  images: CarouselImage[] = [];
  currentIndex: number = 0;

  ngOnChanges() {
    this.saisonService.getSpielerBilder(this.spielerkurz).subscribe(data => {
      console.table(data); // Überprüfe die erhaltenen Daten in der Konsole
      this.rawPaths = data;
      this.images = this.rawPaths.map(path => {
        console.log('Verarbeite Pfad:', path); // Debug-Ausgabe für jeden Pfad
      return {
        url: this.transformToWebPath(path),
        filename: this.getFilenameFromPath(path),
        spieltag: this.getSpieltag(path)
      };
    });
    });
    
  }

  // Wandelt den Windows-Pfad in einen Pfad um, den dein Webserver versteht
private transformToWebPath(windowsPath: string): string {  
  let cleanPath = windowsPath.replace(/\\/g, '/');  // 1. Ersetze alle Backslashes durch normale Slashes
  const rootPrefix = 'V:/05/';  // 2. Entferne das "V:/05/"
  
  if (cleanPath.startsWith(rootPrefix)) {
    cleanPath = cleanPath.substring(rootPrefix.length);
  }

  return `/api/static-files/${cleanPath}`;  // 3. Setze den API-Pfad davor dann: "/api/static-files/Saison2526/Fotos/Saison2526_06_Schomaker,J.png"
}

// Extrahiert den reinen Dateinamen (z.B. "Saison2526_06_Schomaker,J")
  private getFilenameFromPath(windowsPath: string): string {    
    const baseName = windowsPath.substring(windowsPath.lastIndexOf('\\') + 1); // Holt den Teil nach dem letzten Backslash    
    return baseName.substring(0, baseName.lastIndexOf('.'));  // Schneidet die Dateiendung (.png / .jpg) ab
  }

 private getSpieltag(windowsPath: string): string {    
    const baseName = windowsPath.substring(windowsPath.lastIndexOf('\\') + 1); // Holt den Teil nach dem letzten Backslash    
    return baseName.substring(baseName.indexOf('_') + 1, baseName.indexOf('_', baseName.indexOf('_') + 1));
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

  goToSlide(index: number) {
    this.currentIndex = index;
  }
}