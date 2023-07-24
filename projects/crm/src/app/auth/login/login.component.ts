import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService, LoginData } from '../auth.service';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-login',
  template: `
    <div class="bg-light rounded p-3">
      <h1>Connexion à NgCRM !</h1>
      <form [formGroup]="loginForm" (submit)="onSubmit()">
        <div class="alert bg-warning" *ngIf="errorMessage">
          {{ errorMessage }}
        </div>
        <div>
          <label class="mb-1" for="email">Adresse email</label>
          <input
            formControlName="email"
            [class.is-invalid]="email.touched && email.invalid"
            type="email"
            placeholder="Adresse email de connexion"
            name="email"
            id="email"
            class="mb-3 form-control"
          />
          <p class="invalid-feedback">L'adresse email doit être valide</p>
        </div>
        <div>
          <label class="mb-1" for="password">Mot de passe</label>
          <input
            formControlName="password"
            [class.is-invalid]="password.touched && password.invalid"
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

        <button class="btn btn-success">Connexion !</button>
      </form>
    </div>
  `,
  styles: [],
})
export class LoginComponent {
  private readonly unsubscribe$: Subject<void> = new Subject();
  errorMessage = '';
  loginForm = this.fb.group({
    email: ['marko@mail.com', [Validators.required, Validators.email]],
    password: [
      'passw0rd',
      [Validators.required, Validators.minLength(5), Validators.pattern(/\d+/)],
    ],
  });

  constructor(
    private auth: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  get email() {
    return this.loginForm.controls.email;
  }

  get password() {
    return this.loginForm.controls.password;
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    const loginData: LoginData = {
      email: this.email.value!,
      password: this.password.value!,
    };

    this.auth
      .login(loginData)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: () => this.router.navigateByUrl('/'),
        error: (error) => (this.errorMessage = error.error.message),
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
