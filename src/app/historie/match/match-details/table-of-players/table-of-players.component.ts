import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpieltagskaderEintrag } from '../../match.module';

@Component({
  selector: 'app-table-of-players',
  imports: [CommonModule],
  templateUrl: './table-of-players.component.html',
  styleUrls: ['./table-of-players.component.css']
})
export class TableOfPlayersComponent {
  @Input() typ: string = '';
  @Input() titel: string = '';
  @Input() playerstable: SpieltagskaderEintrag[] = [];
}
