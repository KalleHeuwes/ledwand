import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaisonsService } from 'src/app/historie/saisonauswahl/saisons.service';
import { Saison } from 'src/app/historie/saisonauswahl/saison';

@Component({
  selector: 'app-seasons',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './seasons.component.html'
})
export class SeasonsComponent implements OnInit {
  tableData: Saison[] = [];

  constructor(private saisonService: SaisonsService) {}

  ngOnInit() {
    this.saisonService.getSaisons().subscribe((data: Saison[]) => {
       this.tableData = data;
    });
  }
}
