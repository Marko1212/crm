import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { InscriptionComponent } from './inscription.component';
import { BannedEmailDirective } from './banned-email.directive';
import { UniqueEmailValidator } from './unique-email.validator';
import { ConfirmPasswordValidator } from './confirm-password.validator';
import { ColorPickerComponent } from './color-picker.component';
import { ReactiveInscriptionComponent } from './reactive-inscription.component';
import { AppComponent } from './app.component';
import { ReactiveRecipeComponent } from './reactive-recipe.component';
import { MoviesComponent } from './movies/movies.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MoviesService } from './movies/movies.service';
import { MoviesKeyInterceptor } from './movies/movies-key.interceptor';
import { IntervalComponent } from './interval.component';

@NgModule({
  declarations: [
    AppComponent,
    InscriptionComponent,
    BannedEmailDirective,
    UniqueEmailValidator,
    ConfirmPasswordValidator,
    ColorPickerComponent,
    ReactiveInscriptionComponent,
    ReactiveRecipeComponent,
    MoviesComponent,
    IntervalComponent,
  ],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  providers: [
    MoviesService,
    { provide: HTTP_INTERCEPTORS, useClass: MoviesKeyInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
