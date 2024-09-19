import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {
  public static readonly HOST = 'heuweslap3';
  public static readonly URL = 'http://' + ConfigurationService.HOST + ':8080';
  public static readonly URLUPLOAD = 'http://' + ConfigurationService.HOST + ':3000';
  constructor() { }
}
