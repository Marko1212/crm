import { NgModule } from '@angular/core';
import { EmailsComponent } from './emails.component';
import { EmailsListComponent } from './emails-list.component';
import { EmailDetailsComponent } from './email-details.component';
import { EmailCreationComponent } from './email-creation.component';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: EmailsComponent,
    children: [
      {
        path: '',
        component: EmailsListComponent,
      },
      { path: 'create', component: EmailCreationComponent },
      { path: ':type', component: EmailsListComponent },
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
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class EmailModule {}
