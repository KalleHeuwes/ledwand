import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-spieltag',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './spieltag.component.html',
  styleUrl: './spieltag.component.css'
})
export class SpieltagComponent {
  public toreHeim: Observable<number>;
  public toreGast: number = 0;
  count$: Observable<number>;

  constructor(private store: Store<{ count: number }>) {
    this.count$ = store.select('count');
    this.toreHeim = store.select('count');
  }
}
