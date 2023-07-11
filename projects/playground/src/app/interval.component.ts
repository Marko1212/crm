import { Component } from '@angular/core';
import {
  Observable,
  Subject,
  Subscription,
  interval,
  takeUntil,
  tap,
} from 'rxjs';
import { MoviesService } from './movies/movies.service';

@Component({
  selector: 'app-interval',
  template: ` Interval {{ counter$ | async }} `,
  styles: [],
})
export class IntervalComponent {
  counter$?: Observable<number>;
  //  destroy$ = new Subject();
  //  souscription?: Subscription;
  // intervalId?: number;

  constructor() {}

  ngOnInit() {
    /*     this.souscription = interval(1000).subscribe(() => {
      this.counter++;
      console.log(this.counter); */
    this.counter$ = interval(1000).pipe(tap((value) => console.log(value)));
    //    .pipe(takeUntil(this.destroy$))
    /*       .subscribe(() => {
        this.counter++;
        console.log(this.counter);
      }); */

    /*     this.intervalId = window.setInterval(() => {
      this.counter++;
      console.log(this.counter);
    }, 1000); */
  }

  ngOnDestroy() {
    //   this.destroy$.next(null);
    //  this.souscription?.unsubscribe();
    /*     if (this.intervalId) {
      window.clearInterval(this.intervalId);
    } */
  }
}
