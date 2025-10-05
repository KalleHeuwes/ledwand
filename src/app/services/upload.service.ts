import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigurationService } from './configuration.service';
import { Observable } from 'rxjs';
 
@Injectable({
 providedIn: 'root'
})
export class UploadService {
 
 constructor(
   private httpClient: HttpClient,
 ) { }
 
 public uploadfile(file: File) {
   let formParams = new FormData();
   formParams.append('file', file)
   return this.httpClient.post(ConfigurationService.URL + '/uploadFile', formParams)
 }

  /**
   * Startet den CSV-Import im Spring Boot Backend.
   * Da der Backend-Endpunkt ein POST ist, verwenden wir http.post().
   * Der Body kann leer sein, da keine Daten gesendet werden müssen.
   */
  startDataImport(): Observable<string> {
    console.log('startDataImport...{}', ConfigurationService.URL + '/historie/import');
    // Die Anfrage sendet ein leeres Objekt als Body ({})
    // Der String-Typ in Observable<> definiert den erwarteten Rückgabetyp (z.B. die Bestätigungsnachricht)
    return this.httpClient.post<string>(
      ConfigurationService.URL + '/historie/import', {}, { responseType: 'text' as 'json' });
  }
}
