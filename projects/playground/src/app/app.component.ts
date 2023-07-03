import { Component } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-root',
  template: `<div class="container">
    <h1>Angular Avancé !</h1>
    <form [formGroup]="inscription" (submit)="onSubmit()">
      <input
        formControlName="email"
        [class.is-invalid]="email.touched && email.invalid"
        [class.is-valid]="email.touched && email.valid"
        type="email"
        name="email"
        id="email"
        class="form-control mb-2"
        placeholder="Votre adresse email"
      />
      <p class="text-info" *ngIf="email.pending">
        <span class="spinner-border spinner-border-sm"></span> Chargement ...
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
        L'adresse email n'est pas valide
      </p>
      <p
        class="invalid-feedback"
        *ngIf="email.touched && email.hasError('bannedEmail')"
      >
        L'adresse email est interdite
      </p>
      <p
        class="invalid-feedback"
        *ngIf="email.touched && email.hasError('uniqueEmail')"
      >
        L'adresse email est déjà utilisée
      </p>
      <input
        formControlName="password"
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
        Le mot de passe doit faire au moins 4 caractères
      </p>
      <input
        formControlName="confirm"
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
        La confirmation est obligatoire
      </p>
      <button class="btn btn-success">Inscription</button>
    </form>
  </div>`,
})
export class AppComponent {
  get email() {
    return this.inscription.controls.email;
  }

  get password() {
    return this.inscription.controls.password;
  }

  get confirm() {
    return this.inscription.controls.confirm;
  }

  inscription = new FormGroup(
    {
      email: new FormControl(
        '',
        [
          Validators.required,
          Validators.email,
          createBannedEmailValidator('test@test.fr'),
        ],
        [uniqueEmailValidator]
      ),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      confirm: new FormControl('', [Validators.required]),
    },
    { validators: [confirmPasswordValidator] }
  );

  onSubmit() {
    console.log(this.inscription.value);
  }
}

const confirmPasswordValidator: ValidatorFn = (
  control: AbstractControl<{
    password: FormControl<string>;
    confirm: FormControl<string>;
  }>
) => {
  const password = control.get('password');
  const confirm = control.get('confirm');

  if (password?.value === confirm?.value) {
    return null;
  }

  return { confirmPassword: true };
};

const uniqueEmailValidator: AsyncValidatorFn = (
  control: AbstractControl<string>
) => {
  return fetch(
    'https://jsonplaceholder.typicode.com/users?email=' + control.value
  )
    .then((response) => response.json())
    .then((users: any[]) => {
      if (users.length > 0) {
        return { uniqueEmail: true };
      }

      return null;
    });
};

const createBannedEmailValidator = (bannedEmail: string) => {
  const bannedEmailValidator: ValidatorFn = (
    control: AbstractControl<string>
  ) => {
    if (control.value === bannedEmail) {
      return { bannedEmail: true };
    }

    return null;
  };

  return bannedEmailValidator;
};
