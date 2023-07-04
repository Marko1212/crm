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
  ],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
