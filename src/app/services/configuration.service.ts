import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {
  public static readonly HOST = 'heuweslap3';
  public static readonly URL = 'http://' + ConfigurationService.HOST + ':8080';
  public static readonly URLUPLOAD = 'http://' + ConfigurationService.HOST + ':3000';
  public static rxTime = new Date();
  
  constructor() { }

  public static JSONHeaders(){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    return headers;
  }
   
  public static berechneSpielminute(anpfiff: string, halbzeit: number){
    let dt = "2018-11-29 ";
    let hour = this.rxTime.getHours();
    let minuts = this.rxTime.getMinutes();
    let seconds = this.rxTime.getSeconds();
    let NewTime = hour + ":" + minuts + ":" + seconds
    
    let startDate = new Date(dt + anpfiff);
    let aktDate = new Date(dt + NewTime);
    let diffMs: number = (aktDate.getTime() - startDate.getTime()); // milliseconds
    let diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
    return 1 + diffMins + (halbzeit - 1) * 45;
  }
}
