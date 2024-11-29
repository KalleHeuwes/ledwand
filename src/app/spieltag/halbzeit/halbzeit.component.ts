import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-halbzeit',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './halbzeit.component.html',
  styleUrl: './halbzeit.component.css'
})
export class HalbzeitComponent implements OnInit {
  public medien: String[] = [];
  anzahl: number = 0;
  zaehler: number = 0;

  ngOnInit(): void {
    console.log('* HalbzeitComponent.ngOnInit ');
    this.medien.push("assets/pictures/sponsors/Salvus02.png");
  }

}
