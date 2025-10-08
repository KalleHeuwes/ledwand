import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {
  public static readonly HOST = 'localhost'; // 'heuweslap2'
  public static readonly ANZEIGE_TS: number = 2000;
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

  public static TextHeaders(){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/text');
    headers.append('Accept', 'application/text');
    return headers;
  }
   
  public static berechneSpielminute(anpfiff: string, halbzeit: number){
    //console.log("configuration.service berechneSpielminute ..." + anpfiff);
    if(anpfiff=='') return -1;

    this.rxTime = new Date();
    let dt = "2018-11-29 ";
    let hour = this.rxTime.getHours();
    let minuts = this.rxTime.getMinutes();
    let seconds = this.rxTime.getSeconds();
    let NewTime = hour + ":" + minuts + ":" + seconds
    
    let startDate = new Date(dt + anpfiff);
    let aktDate = new Date(dt + NewTime);
    
    let diffMs: number = (aktDate.getTime() - startDate.getTime()); // milliseconds
    let diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
    let minutes = Math.floor(diffMs / 1000 / 60);
    //console.log(anpfiff + "|" + NewTime + "|" + minutes);
    return 1 + minutes + (halbzeit - 1) * 45;
  }
}
