import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthService } from './user/auth.service';
import { LoadingBarComponent } from './loading-bar.component';

const routes: Routes = [
  {
    path: 'account',
    loadChildren: () =>
      import('./user/user.module').then((file) => file.UserModule),
  },
  {
    path: 'emails',
    loadChildren: () =>
      import('./email/email.module').then((file) => file.EmailModule),
    canActivate: [AuthGuard],
  },
  /*   {
    path: '',
    redirectTo: '/emails',
    pathMatch: 'full',
  }, */
];

@NgModule({
  declarations: [AppComponent, LoadingBarComponent],
  imports: [BrowserModule, RouterModule.forRoot(routes)],
  providers: [AuthGuard, AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
