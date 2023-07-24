import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthService, TOKEN_MANAGER } from './auth/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { LocalStorageTokenManager } from './auth/token-manager.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, SharedModule],
  providers: [
    AuthService,
    {
      provide: TOKEN_MANAGER,
      useClass: LocalStorageTokenManager,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
