import { Component } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormArray,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-inscription-reactive',
  template: `<div class="container">
    <h1>Angular Avancé !</h1>
    <form [formGroup]="inscription" (submit)="onSubmit()">
      <input
        required
        email
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
      <div formGroupName="security">
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
        <p
          class="invalid-feedback"
          *ngIf="confirm.touched && confirm.hasError('confirmPassword')"
        >
          La confirmation n'est pas identique au mot de passe
        </p>
      </div>
      <app-color-picker formControlName="favoriteColor"></app-color-picker>
      <h3>
        Quels sont vos langages favoris?
        <button
          (click)="addLanguage()"
          class="btn btn-primary btn-sm"
          type="button"
        >
          + Ajouter un langage
        </button>
      </h3>

      <div class="alert bg-info" *ngIf="languages.controls.length === 0">
        Vous n'avez pas ajouté de langage, cliquez sur le bouton ci-dessus
      </div>

      <p class="text-danger" *ngIf="languages.hasError('mustHave2Languages')">
        Vous devez avoir 2 langages au minimum
      </p>
      <div
        class="row"
        *ngFor="let group of languages.controls; let i = index"
        [formGroup]="group"
      >
        <div class="col">
          <input
            type="text"
            class="form-control mb-2"
            placeholder="Nom du langage"
            formControlName="name"
          />
        </div>
        <div class="col">
          <select formControlName="level" class="form-control">
            <option value="debutant">Débutant(e)</option>
            <option value="confirme">Confirmé(e)</option>
          </select>
        </div>
        <div class="col-1">
          <button
            (click)="languages.removeAt(i)"
            class="btn btn-sm btn-danger"
            type="button"
          >
            X
          </button>
        </div>
      </div>

      <button class="btn btn-success">Inscription</button>
    </form>
  </div>`,
})
export class ReactiveInscriptionComponent {
  ngOnInit() {
    // Requête HTTP qui reçoit les infos de l'utilisateur-ice
    /*     this.addLanguage();
    this.addLanguage();
    this.inscription.patchValue({
      favoriteColor: 'purple',
      email: 'marko@marko.rs', */
    /*       security: {
        password: 'toto',
        confirm: 'toto', */
    //  },
    /*       languages: [
        { name: 'PHP', level: 'confirme' },
        { name: 'JavaScript', level: 'confirme' },
      ],
    }); */
    /*     this.inscription.valueChanges.subscribe((value) => {
      console.log(value);
    }); */

    this.inscription.controls.favoriteColor.valueChanges.subscribe((value) => {
      console.log('La valeur a changé', value);

      if (value === 'purple') {
        this.languages.addValidators(mustHave2LanguagesValidator);
        this.languages.updateValueAndValidity();
        return;
      }

      this.languages.removeValidators(mustHave2LanguagesValidator);
      this.languages.updateValueAndValidity();
    });
  }
  get languages() {
    return this.inscription.controls.languages;
  }

  addLanguage() {
    this.languages.push(
      new FormGroup({
        name: new FormControl(),
        level: new FormControl('debutant'),
      })
    );
  }

  get email() {
    return this.inscription.controls.email;
  }

  get password() {
    return this.security.controls.password;
  }

  get confirm() {
    return this.security.controls.confirm;
  }

  get security() {
    return this.inscription.controls.security;
  }

  inscription = new FormGroup({
    favoriteColor: new FormControl(),
    languages: new FormArray<FormGroup>([]),
    email: new FormControl(
      '',
      [createBannedEmailValidator('test@test.fr')],
      [uniqueEmailValidator]
    ),
    security: new FormGroup(
      {
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(4),
        ]),
        confirm: new FormControl('', [Validators.required]),
      },
      { validators: [confirmPasswordValidator] }
    ),
  });

  onSubmit() {
    console.log(this.inscription.value);
  }
}

const mustHave2LanguagesValidator: ValidatorFn = (control: AbstractControl) => {
  const array = control as FormArray;

  if (array.length < 2) {
    return {
      mustHave2Languages: true,
    };
  }

  return null;
};

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

  confirm?.setErrors({ confirmPassword: true });

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
