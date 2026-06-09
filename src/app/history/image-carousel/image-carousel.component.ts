import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaisonsService } from 'src/app/historie/saisonauswahl/saisons.service';

interface CarouselImage {
  url: string;
  filename: string;
}
@Component({
  selector: 'app-image-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-carousel.component.html',
  styleUrls: ['./image-carousel.component.css']
})
export class ImageCarouselComponent implements OnInit {
  @Input() spielerkurz: string = '';
  constructor(private saisonService: SaisonsService) {}

  // Die Rohdaten aus deinem Array
  rawPaths: string[] = [];
  /*[
  "V:/05/Saison2526/Fotos/Saison2526_06_Schomaker,J.png",
  "V:/05/Saison2526/Fotos/Saison2526_06_Schomaker,M.png",
  "V:/05/Saison2526/Fotos/Saison2526_11_Schomaker,M-Demirdag,E.png",
  "V:/05/Saison2526/Fotos/Saison2526_12_Schomaker,M.png",
  "V:/05/Saison2526/Fotos/Saison2526_13_Schomaker,M.png",
  "V:/05/Saison2526/Fotos/Saison2526_22_Möllers,H-Matsubara,D-Schomaker,M.png",
  "V:/05/Saison2526/Fotos/Saison2526_23_Schomaker,M-Matsubara,D.png",
  "V:/05/Saison2526/Fotos/Saison2526_28_Schomaker,M.png",
  "V:/05/Saison2526/Fotos/Saison2526_32_Fousseni,A-Kötter,M-Wenning,T-Schomaker,J.png",
  "V:/05/Spieler/Schomaker_Jonas_0_20250701.jpg",
  "V:/05/Spieler/Schomaker_Marius_0_20250701.jpg"
];*/

  // Dieses Array hält die für den Browser lesbaren URLs
images: CarouselImage[] = [];
  currentIndex: number = 0;

  ngOnInit() {
    this.saisonService.getSpielerBilder(this.spielerkurz).subscribe(data => {
      console
       this.rawPaths = data;
    });
    this.images = this.rawPaths.map(path => {
      return {
        url: this.transformToWebPath(path),
        filename: this.getFilenameFromPath(path)
      };
    });
  }

  // Wandelt den Windows-Pfad in einen Pfad um, den dein Webserver versteht
private transformToWebPath(windowsPath: string): string {
  // 1. Ersetze alle Backslashes durch normale Slashes
  let cleanPath = windowsPath.replace(/\\/g, '/');
  
  // 2. Entferne das "V:/05/" (bzw. "V:/", je nachdem wo dein Resource Handler ansetzt)
  // Da dein Java Resource Handler auf "file:V:/05/" zeigt, ist "V:/05/" die Basis (Root).
  const rootPrefix = 'V:/05/';
  
  if (cleanPath.startsWith(rootPrefix)) {
    cleanPath = cleanPath.substring(rootPrefix.length);
  }

  // 3. Setze den API-Pfad davor
  // Das Ergebnis ist dann: "/api/static-files/Saison2526/Fotos/Saison2526_06_Schomaker,J.png"
  return `/api/static-files/${cleanPath}`; 
}

// Extrahiert den reinen Dateinamen (z.B. "Saison2526_06_Schomaker,J")
  private getFilenameFromPath(windowsPath: string): string {
    // Holt den Teil nach dem letzten Backslash
    const baseName = windowsPath.substring(windowsPath.lastIndexOf('/') + 1);
    // Schneidet die Dateiendung (.png / .jpg) ab
    return baseName.substring(0, baseName.lastIndexOf('.'));
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