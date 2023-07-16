import { Component } from '@angular/core';
import { AuthService } from './user/auth.service';
import {
  ActivationStart,
  GuardsCheckEnd,
  NavigationEnd,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  template: `<nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container-fluid">
        <a class="navbar-brand" routerLinkActive="active" routerLink="/"
          >NgMails</a
        >
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarColor01"
          aria-controls="navbarColor01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarColor01">
          <ul class="navbar-nav me-auto">
            <li class="nav-item" *ngIf="isAuthenticated$ | async">
              <a class="nav-link" routerLinkActive="active" routerLink="/emails"
                >Mes messages
              </a>
            </li>
          </ul>
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <a
                class="nav-link"
                routerLinkActive="active"
                routerLink="/account/login"
                >Connexion</a
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                routerLinkActive="active"
                routerLink="/account/register"
                >Inscription</a
              >
            </li>
            <li class="nav-item">
              <button class="btn btn-sm btn-danger" (click)="onLogout()">
                Déconnexion
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <app-loading-bar></app-loading-bar>
    <div class="container pt-5">
      <router-outlet></router-outlet>
    </div>`,
  styles: [],
})
export class AppComponent {
  isAuthenticated$?: Observable<boolean>;
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    /*     this.isAuthenticated = this.auth.authStatus;

    this.auth.authStatus$.subscribe((authStatus) => {
      this.isAuthenticated = authStatus;
    }); */
    this.isAuthenticated$ = this.auth.authStatus$;
  }

  onLogout() {
    this.auth.logout();
    this.router.navigateByUrl('/account/login');
  }
}
