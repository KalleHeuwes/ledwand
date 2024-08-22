import {ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  selector: 'app-spielerkarte',
  templateUrl: './spielerkarte.component.html',
  styleUrl: './spielerkarte.component.css',
})
export class SpielerkarteComponent {
  @Input() nr!: string;
  @Input() name1!: string;
  @Input() name2!: string;
  @Input() pic!: string;
}

