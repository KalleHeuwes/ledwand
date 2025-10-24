import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileItem } from '../../match.module';

@Component({
  selector: 'app-table-of-docs',
  imports: [CommonModule],
  templateUrl: './table-of-docs.component.html',
  styleUrl: './table-of-docs.component.css'
})
export class TableOfDocsComponent {
  @Input() titel: string = '';
  @Input() docs: FileItem[] = [];

      openFile(filePath: String): void {
      
      // 1. URI-Codierung des Pfadparameters
      const encodedPath = encodeURIComponent(filePath.toString());
      
      // 2. Erstellung der vollständigen URL zum Backend-Endpunkt
      const fullUrl = `http://localhost:8080/api/files/download?filePath=${encodedPath}`;
      window.open(fullUrl, '_blank');
    }

}
