import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-spielstand',
    standalone: true,
    imports: [],
    templateUrl: './spielstand.component.html',
    styleUrl: './spielstand.component.css'
})
export class SpielstandComponent {
  @Input() toreHeim!: string;
  @Input() toreGast!: string;
  @Input() design!: string;

}
