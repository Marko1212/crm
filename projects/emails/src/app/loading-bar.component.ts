import { Component, OnInit } from '@angular/core';
import {
  ActivationStart,
  GuardsCheckEnd,
  NavigationEnd,
  ResolveEnd,
  ResolveStart,
  Router,
} from '@angular/router';
import { Subject, delay, filter, map, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-loading-bar',
  template: ` <div style="position: relative">
    <div
      [style.display]="display"
      [style.width]="width"
      class="loading-bar"
    ></div>
  </div>`,
  styles: [
    `
      .loading-bar {
        height: 5px;
        background-color: green;
        width: 0%;
        transition: width 0.2s;
        position: absolute;
        top: 0;
        left: 0;
      }
    `,
  ],
})
export class LoadingBarComponent implements OnInit {
  _width = 0;
  display = 'none';
  destroy$ = new Subject();

  get width() {
    return this._width + '%';
  }

  constructor(private router: Router) {}

  ngOnInit(): void {
    const percentMap = new Map();

    percentMap.set(ActivationStart, 30);
    percentMap.set(GuardsCheckEnd, 50);
    percentMap.set(ResolveStart, 80);
    percentMap.set(ResolveEnd, 100);

    this.router.events
      .pipe(
        tap(() => (this.display = 'block')),
        delay(100),
        map((event) => percentMap.get(event.constructor)),
        filter((width) => !!width),
        tap((width) => (this._width = width)),
        filter((width) => width === 100),
        delay(500),
        tap(() => {
          this._width = 0;
          this.display = 'none';
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();

    /* 
    this.router.events.subscribe((event) => {
      this.display = 'block';
      if (event instanceof ActivationStart) {
        this._width = 30;
      }

      if (event instanceof GuardsCheckEnd) {
        this._width = 50;
      }

      if (event instanceof ResolveEnd) {
        this._width = 85;
      }

      if (event instanceof NavigationEnd) {
        this._width = 100;

        setTimeout(() => {
          this._width = 0;
          this.display = 'none';
        }, 1000);
      }
    }); */
  }

  ngOnDestroy() {
    this.destroy$.next(null);
  }
}
