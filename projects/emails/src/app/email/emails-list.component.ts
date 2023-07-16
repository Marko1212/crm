import { Component } from '@angular/core';
import { FAKE_EMAILS_DATA } from '../data';
import { Email } from './types';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, delay, map } from 'rxjs';

@Component({
  selector: 'app-emails-list',
  template: `
    <div *ngIf="emailsAndTitle$ | async as vm">
      <h1>{{ vm.title }}</h1>
      <table class="table">
        <tbody>
          <tr
            (click)="goToEmail(email.id)"
            [class.fw-bold]="!email.read"
            *ngFor="let email of vm.emails"
          >
            <td>{{ email.contactName }}</td>
            <td class="w-50">{{ email.subject }}</td>
            <td>{{ email.date }}</td>
            <td>
              <button class="btn btn-sm btn-danger">Supprimer</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [
    `
      tr {
        cursor: pointer;
      }

      tr:hover td {
        background-color: #eee;
      }
    `,
  ],
})
export class EmailsListComponent {
  /*   emails: Email[] = [];
  title = 'Boîte de réception'; */

  emailsAndTitle$?: Observable<{ emails: Email[]; title: string }>;
  type?: string | null;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    //  console.log(this.route.snapshot);
    /*     const type = this.route.snapshot.paramMap.get('type');
    this.emails = (FAKE_EMAILS_DATA as Email[]).filter(
      (email) => email.status === type?.toUpperCase()
    ); */
    this.emailsAndTitle$ = this.route.data.pipe(
      map((data) => {
        return {
          emails: data['emails'] as Email[],
          title: data['title'],
        };
      })
    );

    /*     this.emailsAndTitle$ = this.route.paramMap.pipe(
      delay(1000),
      map((paramMap) => paramMap.get('type')),
      map((type) => {
        this.type = type;
        if (!type) {
          return {
            emails: (FAKE_EMAILS_DATA as Email[]).filter(
              (email) => email.status === 'INBOX'
            ),
            title: 'Boîte de réception',
          };
        }

        return {
          emails: (FAKE_EMAILS_DATA as Email[]).filter(
            (email) => email.status === type?.toUpperCase()
          ),
          title: type === 'sent' ? 'Emails envoyés' : 'Corbeille',
        };
      })
    ); */

    /*     this.route.paramMap.subscribe((paramMap) => {
      const type = paramMap.get('type');

      if (!type) {
        this.emails = (FAKE_EMAILS_DATA as Email[]).filter(
          (email) => email.status === 'INBOX'
        );

        this.title = 'Boîte de réception';
        return;
      }

      this.emails = (FAKE_EMAILS_DATA as Email[]).filter(
        (email) => email.status === type?.toUpperCase()
      );

      if (type === 'sent') {
        this.title = 'Emails envoyés';
        return;
      }

      this.title = 'Corbeille';
    }); */
  }

  goToEmail(id: number) {
    //   this.router.navigateByUrl('/emails/read/' + id);
    if (!this.type) {
      this.router.navigate(['./', 'read', id], { relativeTo: this.route });
      return;
    }

    this.router.navigate(['../', 'read', id], { relativeTo: this.route });
    return;
  }
}
