import { Component } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { MoviesService } from './movies/movies.service';

@Component({
  selector: 'app-interval',
  template: ` Interval {{ counter }} `,
  styles: [],
})
export class IntervalComponent {
  counter = 0;
  souscription?: Subscription;
  // intervalId?: number;

  constructor() {}

  ngOnInit() {
    /*     this.souscription = interval(1000).subscribe(() => {
      this.counter++;
      console.log(this.counter); */
    this.souscription = interval(1000).subscribe(() => {
      this.counter++;
      console.log(this.counter);
    });

    /*     this.intervalId = window.setInterval(() => {
      this.counter++;
      console.log(this.counter);
    }, 1000); */
  }

  ngOnDestroy() {
    this.souscription?.unsubscribe();
    /*     if (this.intervalId) {
      window.clearInterval(this.intervalId);
    } */
  }
}
