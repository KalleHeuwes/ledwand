import {ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [MatCardModule, MatButtonModule],
    selector: 'app-spielerkarte-klein',
    templateUrl: './spielerkarte-klein.component.html',
    styleUrl: './spielerkarte-klein.component.css'
})
export class SpielerkarteKleinComponent {
  @Input() nr!: string;
  @Input() name1!: string;
  @Input() name2!: string;
  @Input() pic!: string;
}
