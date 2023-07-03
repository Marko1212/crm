import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-inscription',
  template: `
    <div class="container">
      <h1>Angular Avancé !</h1>
      <pre
        >{{ form.value | json }}
      </pre
      >
      Formulaire valide : {{ form.valid }}
      <form #form="ngForm" (submit)="onSubmit(form)">
        {{ data.email }}
        <input
          required
          email
          bannedEmail="test@test.fr"
          uniqueEmail
          [(ngModel)]="data.email"
          #email="ngModel"
          [class.is-invalid]="email.touched && email.invalid"
          [class.is-valid]="email.touched && email.valid"
          type="email"
          name="email"
          id="email"
          class="form-control mb-2"
          placeholder="Votre adresse email"
        />
        <p class="text-info" *ngIf="email.pending">
          <span class="spinner-border spinner-border-sm"></span> Vérification en
          cours
        </p>
        <p
          class="invalid-feedback"
          *ngIf="email.touched && email.hasError('bannedEmail')"
        >
          L'adresse email {{ email.getError('bannedEmail') }} est interdite
        </p>
        <p
          class="invalid-feedback"
          *ngIf="email.touched && email.hasError('required')"
        >
          L'adresse email est obligatoire
        </p>
        <p
          class="invalid-feedback"
          *ngIf="email.touched && email.hasError('email')"
        >
          L'adresse email est invalide
        </p>

        {{ data.color }}
        <app-color-picker
          [(ngModel)]="data.color"
          [ngModelOptions]="{ name: 'color' }"
          label="Quelle est votre couleur préférée?"
          color="blue"
        ></app-color-picker>
        <div ngModelGroup="security" confirmPassword>
          <input
            required
            minlength="3"
            #password="ngModel"
            [(ngModel)]="data.password"
            [class.is-invalid]="password.touched && password.invalid"
            [class.is-valid]="password.touched && password.valid"
            type="password"
            name="password"
            id="password"
            class="form-control mb-2"
            placeholder="Mot de passe"
          />
          <p
            class="invalid-feedback"
            *ngIf="password.touched && password.hasError('required')"
          >
            Le mot de passe est obligatoire
          </p>
          <p
            class="invalid-feedback"
            *ngIf="password.touched && password.hasError('minlength')"
          >
            Le mot de passe doit faire au moins 3 caractères
          </p>
          <input
            required
            minlength="3"
            #confirm="ngModel"
            ngModel
            [class.is-invalid]="confirm.touched && confirm.invalid"
            [class.is-valid]="confirm.touched && confirm.valid"
            type="password"
            name="confirm"
            id="confirm"
            class="form-control mb-2"
            placeholder="Confirmation du mot de passe"
          />
          <p
            class="invalid-feedback"
            *ngIf="confirm.touched && confirm.hasError('required')"
          >
            La confirmation du mot de passe est obligatoire
          </p>
          <p
            class="invalid-feedback"
            *ngIf="confirm.touched && confirm.hasError('minlength')"
          >
            La confirmation du mot de passe doit faire au moins 3 caractères
          </p>
          <p
            class="invalid-feedback"
            *ngIf="confirm.touched && confirm.hasError('confirmPassword')"
          >
            La confirmation ne correspond pas au mot de passe
          </p>
        </div>
        <button class="btn btn-success" [disabled]="form.invalid">
          Inscription
        </button>
      </form>
    </div>
  `,
  styles: [],
})
export class InscriptionComponent {
  data = {
    email: 'marko@marko.rs',
    color: 'purple',
    password: 'pass4',
  };

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    console.log(form.value);
  }
}
