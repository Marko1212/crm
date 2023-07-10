import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: ` <div class="container">
    <h1>Movie DB</h1>
    <app-interval *ngIf="showInterval"></app-interval>
    <button (click)="showInterval = !showInterval" class="btn btn-success">
      Montrer/Cacher l'intervalle
    </button>
    <app-movies></app-movies>
  </div>`,
})
export class AppComponent {
  showInterval = true;
}
