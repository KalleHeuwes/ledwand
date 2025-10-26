import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { TorEreignis } from '../../match.module';
@Component({
  selector: 'app-table-of-goals',
  imports: [CommonModule, MatIconModule],
  templateUrl: './table-of-goals.component.html',
  styleUrl: './table-of-goals.component.css'
})
export class TableOfGoalsComponent {
  @Input() titel: string = '';
  @Input() nameGegner: string = '';
  @Input() goals: TorEreignis[] = [];
}
