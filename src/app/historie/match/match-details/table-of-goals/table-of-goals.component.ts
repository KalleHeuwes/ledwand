import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { TorEreignis } from '../../match.module';
import { VideoDialogComponent } from 'src/app/history/video-dialog/video-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-table-of-goals',
  imports: [CommonModule, MatIconModule, VideoDialogComponent],
  templateUrl: './table-of-goals.component.html',
  styleUrl: './table-of-goals.component.css'
})
export class TableOfGoalsComponent {
  @Input() titel: string = '';
  @Input() nameGegner: string = '';
  @Input() goals: TorEreignis[] = [];

  constructor(public dialog: MatDialog) {}

  /**
   * Öffnet den Angular Material Dialog mit dem Video.
   * @param url Die URL des Videos.
   */
  openVideoDialog(url: string): void {
    // Nur öffnen, wenn eine URL vorhanden ist
    if (!url) {
      return;
    }

    this.dialog.open(VideoDialogComponent, {
      width: '900px',        // Oder verwenden Sie responsive Werte, z.B. '90vw' (90% der Viewport-Breite)
      height: '600px',       // Oder verwenden Sie responsive Werte, z.B. '85vh' (85% der Viewport-Höhe)
      maxWidth: '100vw',     // Erlaubt fast die gesamte Breite
      maxHeight: '100vh',    // Erlaubt fast die gesamte Höhe
      panelClass: 'video-dialog-custom',
      data: { url: url } // Übergibt die Video-URL an die Dialog-Komponente
    });
  }
}
