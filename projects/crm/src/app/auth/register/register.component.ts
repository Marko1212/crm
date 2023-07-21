import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { map } from 'rxjs';

@Component({
  selector: 'app-register',
  template: `
    <div class="bg-light rounded p-3">
      <h1>Créer un compte sur NgCRM !</h1>
      <p>
        Vous pourrez alors gérer facilement vos factures en tant que Freelance !
      </p>
      <form [formGroup]="registerForm" (submit)="onSubmit()">
        <div>
          <label class="mb-1" for="name">Nom d'utilisateur</label>
          <input
            formControlName="name"
            [class.is-invalid]="name.invalid && name.touched"
            type="text"
            placeholder="Votre nom d'utilisateur"
            name="name"
            id="name"
            class="mb-3 form-control"
          />
          <p class="invalid-feedback">
            Le nom d'utilisateur est obligatoire et doit faire au moins 5
            caractères
          </p>
        </div>
        <div>
          <label class="mb-1" for="email">Adresse email</label>
          <input
            formControlName="email"
            [class.is-invalid]="email.invalid && email.touched"
            type="email"
            placeholder="Adresse email de connexion"
            name="email"
            id="email"
            class="mb-3 form-control"
          />
          <p
            class="invalid-feedback"
            *ngIf="email.hasError('required') || email.hasError('email')"
          >
            L'adresse email doit être valide
          </p>
          <p class="text-info" *ngIf="email.pending">
            <span class="spinner-border spinner-border-sm"></span> Chargement
            ...
          </p>
          <p class="invalid-feedback" *ngIf="email.hasError('uniqueEmail')">
            Cette adresse est déjà utilisée
          </p>
        </div>
        <div>
          <label class="mb-1" for="password">Mot de passe</label>
          <input
            formControlName="password"
            [class.is-invalid]="password.invalid && password.touched"
            type="password"
            placeholder="Votre mot de passe"
            name="password"
            id="password"
            class="mb-3 form-control"
          />
          <p class="invalid-feedback">
            Le mot de passe est obligatoire, doit faire 5 caractères minimum et
            contenir au moins un chiffre
          </p>
        </div>
        <div>
          <label class="mb-1" for="confirmPassword">Confirmation</label>
          <input
            formControlName="confirmPassword"
            [class.is-invalid]="
              (confirmPassword.invalid || registerForm.hasError('confirm')) &&
              confirmPassword.touched
            "
            type="password"
            placeholder="Confirmez votre mot de passe"
            name="confirmPassword"
            id="confirmPassword"
            class="mb-3 form-control"
          />
          <p
            class="invalid-feedback"
            *ngIf="confirmPassword.hasError('required')"
          >
            La confirmation de mot de passe est obligatoire
          </p>
          <p class="invalid-feedback" *ngIf="registerForm.hasError('confirm') && !confirmPassword.hasError('required')">
            La confirmation ne correspond pas au mot de passe
          </p>
        </div>
        <button class="btn btn-success">Créer mon compte NgCRM !</button>
      </form>
    </div>
  `,
  styles: [],
})
export class RegisterComponent {
  constructor(private http: HttpClient) {}

  uniqueEmailAsyncValidator(control: AbstractControl) {
    return this.http
      .post<{ exists: boolean }>(
        'https://x8ki-letl-twmt.n7.xano.io/api:cLAOENeS/user/validation/exists',
        {
          email: control.value,
        }
      )
      .pipe(
        map((apiResponse) => apiResponse.exists),
        map((exists) => (exists ? { uniqueEmail: true } : null))
      );
  }

  onSubmit() {
    console.log(this.registerForm.value);
  }

  registerForm = new FormGroup(
    {
      email: new FormControl(
        '',
        [Validators.required, Validators.email],
        [this.uniqueEmailAsyncValidator.bind(this)]
      ),
      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.pattern(/\d+/),
      ]),
      confirmPassword: new FormControl('', Validators.required),
    },
    {
      validators: confirmPasswordValidator,
    }
  );

  get name() {
    return this.registerForm.controls.name;
  }

  get email() {
    return this.registerForm.controls.email;
  }

  get password() {
    return this.registerForm.controls.password;
  }

  get confirmPassword() {
    return this.registerForm.controls.confirmPassword;
  }
}

const confirmPasswordValidator: ValidatorFn = (control: AbstractControl) => {
  const password = control.get('password');
  const confirm = control.get('confirmPassword');

  if (password?.value === confirm?.value) {
    return null;
  }

  return {
    confirm: true,
  };
};
