import { Component } from '@angular/core';

@Component({
  selector: 'app-emails',
  template: `
    <div class="row">
      <div class="col-12 col-md-3">
        <a class="btn btn-dark d-block mb-4" routerLink="/emails/create"
          >Nouveau message</a
        >
        <ul class="nav nav-pills flex-column">
          <li class="nav-item">
            <a class="nav-link" routerLink="/emails">Boîte de réception</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" routerLink="/emails/sent">Messages envoyés</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" routerLink="/emails/trash">Corbeille</a>
          </li>
        </ul>
      </div>
      <div class="col">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [],
})
export class EmailsComponent {}
