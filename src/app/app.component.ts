import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: false
})
export class AppComponent implements OnInit {
  public constructor() {
  }
  ngOnInit(): void {
    console.log("ngOnInit AppComponent 1");
  }
  title = '05 - The wall';
    collapsed = false;

  toggleCollapse() {
    this.collapsed = !this.collapsed;
  }
}
