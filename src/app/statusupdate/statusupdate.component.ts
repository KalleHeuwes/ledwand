import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { increment, decrement, reset } from '../../app/statemgmt/counter.actions';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-statusupdate',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './statusupdate.component.html',
  styleUrl: './statusupdate.component.css'
})
export class StatusupdateComponent {
  count$: Observable<number>;

  constructor(private store: Store<{ count: number }>) {
    this.count$ = store.select('count');
  }

  increment() {
    this.store.dispatch(increment());
  }

  decrement() {
    this.store.dispatch(decrement());
  }

  reset() {
    this.store.dispatch(reset());
  }
}
