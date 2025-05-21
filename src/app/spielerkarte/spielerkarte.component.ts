import {ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Player } from '../models/player';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [MatCardModule, MatButtonModule, CommonModule],
    selector: 'app-spielerkarte',
    templateUrl: './spielerkarte.component.html',
    styleUrl: './spielerkarte.component.css'
})
export class SpielerkarteComponent {
  @Input() spieler!: Player;
  @Input() nr!: string;
  @Input() name1!: string;
  @Input() name2!: string;
  @Input() pic!: string;
  @Input() tore!: string;
  @Input() spiele!: string;
  @Input() minuten!: string;
  @Input() modus!: string;
}

