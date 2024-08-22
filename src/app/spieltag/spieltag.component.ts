import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable, share, Subscription, timer } from "rxjs";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-spieltag',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './spieltag.component.html',
  styleUrl: './spieltag.component.css'
})
export class SpieltagComponent implements OnInit, OnDestroy {
  time = new Date();
  rxTime = new Date();
  intervalId: any;
  subscription!: Subscription;
  public toreHeim: number = 0;
  public toreGast: number = 0;
  count$: Observable<number>;

  constructor(private store: Store<{ count: number }>) {
    this.count$ = store.select('count');
  }

  
  ngOnInit() {
    // Using Basic Interval
    this.intervalId = setInterval(() => {
      this.time = new Date();
    }, 1000);

    // Using RxJS Timer
    this.subscription = timer(0, 1000)
      .pipe(
        map(() => new Date()),
        share()
      )
      .subscribe(time => {
        let hour = this.rxTime.getHours();
        let minuts = this.rxTime.getMinutes();
        let seconds = this.rxTime.getSeconds();
        //let a = time.toLocaleString('en-US', { hour: 'numeric', hour12: true });
        let NewTime = hour + ":" + minuts + ":" + seconds
        console.log(NewTime);
      });
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
