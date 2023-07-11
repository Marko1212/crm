import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './user/login.component';
import { RegisterComponent } from './user/register.component';
import { EmailsComponent } from './email/emails.component';
import { EmailsListComponent } from './email/emails-list.component';
import { EmailDetailsComponent } from './email/email-details.component';
import { EmailCreationComponent } from './email/email-creation.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    EmailsComponent,
    EmailsListComponent,
    EmailDetailsComponent,
    EmailCreationComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
