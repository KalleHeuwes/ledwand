import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-subdesign',
  standalone: true,
  imports: [],
  templateUrl: './subdesign.component.html',
  styleUrl: './subdesign.component.css'
})
export class SubdesignComponent {

  @Input() designName!: string;
}
