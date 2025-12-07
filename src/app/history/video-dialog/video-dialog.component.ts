import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-video-dialog',
  templateUrl: './video-dialog.component.html',
  styleUrls: ['./video-dialog.component.css'],
  imports: [CommonModule, MatDialogModule]
})
export class VideoDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { url: string },
    private sanitizer: DomSanitizer
  ) {}

  /**
   * Macht die Video-URL sicher für die Verwendung in einem iFrame.
   * @param url Die unsichere URL.
   * @returns Die sichere URL.
   */
  getSafeUrl(url: string): SafeResourceUrl {
    // Falls es eine YouTube-URL ist, müssen Sie sie möglicherweise in eine Embed-URL umwandeln.
    let embedUrl = url;
    if (url.includes('youtube.com/watch?v=')) {
        embedUrl = url.replace('watch?v=', 'embed/');
    } else if (url.includes('youtu.be/')) {
        embedUrl = url.replace('youtu.be/', 'www.youtube.com/embed/');
    }
    
    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }
}