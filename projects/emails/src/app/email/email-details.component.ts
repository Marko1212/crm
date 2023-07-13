import { Component } from '@angular/core';
import { Email } from './types';
import { ActivatedRoute, Router } from '@angular/router';
import { FAKE_EMAILS_DATA } from '../data';
import { Observable, filter, map } from 'rxjs';

@Component({
  selector: 'app-email-details',
  template: `
    <ng-template #fallBack>
      <h3>Une erreur est survenue, aucun email trouvé</h3>
      <a [routerLink]="['../../']" class="btn btn-primary"
        >Retourner à la boîte de réception</a
      >
    </ng-template>
    <div *ngIf="email$ | async as email; else fallBack">
      <h1>{{ email.subject }}</h1>
      <div class="d-flex justify-content-between align-items-center">
        <em
          >De {{ email.contactName }} ({{ email.from }}), le
          {{ email.date }}</em
        >
        <button class="btn btn-danger" (click)="deleteEmail()">
          Supprimer
        </button>
      </div>
      <hr />
      <p *ngFor="let part of getBodyParts(email.body)">{{ part }}</p>
      <nav>
        <a
          *ngIf="email.id >= 1"
          [routerLink]="['../', email.id - 1]"
          class="btn btn-secondary"
          >&lt; Mail précédent</a
        ><a
          *ngIf="email.id <= totalNumberOfEmails - 2"
          [routerLink]="['../', email.id + 1]"
          class="btn btn-secondary"
          >Mail suivant &gt;</a
        >
      </nav>
    </div>
  `,
  styles: [],
})
export class EmailDetailsComponent {
  // email?: Email;
  email$?: Observable<Email>;

  /*   get bodyParts() {
    return this.email?.body.split('\r\n');
  } */

  getBodyParts(body: string) {
    return body.split('\r\n');
  }

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.email$ = this.route.paramMap.pipe(
      filter((paramMap) => paramMap.has('id')),
      map((paramMap) => +paramMap.get('id')!),
      map((id) => FAKE_EMAILS_DATA.find((email) => email.id === +id) as Email)
    );
    /*     .subscribe((paramMap) => {
      if (!paramMap.has('id')) {
        return;
      }
      const id = +paramMap.get('id')!;

      this.email = FAKE_EMAILS_DATA.find((email) => email.id === id) as Email;
    }); */
  }

  deleteEmail() {
    // this.router.navigateByUrl('emails');
    this.router.navigate(['../../'], {
      relativeTo: this.route,
    });
  }

  get totalNumberOfEmails() {
    return FAKE_EMAILS_DATA.length;
  }
}
