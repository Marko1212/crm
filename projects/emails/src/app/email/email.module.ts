import { NgModule } from '@angular/core';
import { EmailsComponent } from './emails.component';
import { EmailsListComponent } from './emails-list.component';
import { EmailDetailsComponent } from './email-details.component';
import { EmailCreationComponent } from './email-creation.component';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FormGuard } from './form.guard';
import { EmailsResolver } from './emails.resolver';
import { TitleResolver } from './title.resolver';

const routes: Routes = [
  {
    path: '',
    component: EmailsComponent,
    children: [
      {
        path: '',
        component: EmailsListComponent,
        //   data: { title: 'Boîte de réception' },
        resolve: {
          emails: EmailsResolver,
          title: TitleResolver,
        },
      },
      {
        path: 'create',
        component: EmailCreationComponent,
        canDeactivate: [FormGuard],
      },
      {
        path: ':type',
        component: EmailsListComponent,
        resolve: {
          emails: EmailsResolver,
          title: TitleResolver,
        },
      },
      { path: 'read/:id', component: EmailDetailsComponent },
    ],
  },
];

@NgModule({
  declarations: [
    EmailsComponent,
    EmailsListComponent,
    EmailDetailsComponent,
    EmailCreationComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(routes), FormsModule],
  providers: [FormGuard, EmailsResolver, TitleResolver],
})
export class EmailModule {}
