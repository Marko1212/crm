import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { RegisterComponent } from './register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { EMPTY, of, throwError } from 'rxjs';

describe('RegisterComponent', () => {
  let spectator: Spectator<RegisterComponent>;

  const createSpectator = createComponentFactory({
    component: RegisterComponent,
    imports: [ReactiveFormsModule, RouterModule],
    mocks: [AuthService, Router],
  });

  it('should validate inputs', () => {
    spectator = createSpectator();

    // Testing email required
    spectator.typeInElement('', '#email');
    expect(spectator.component.email.invalid).toBeTrue();
    // Testing email format
    spectator.typeInElement('marko', '#email');
    expect(spectator.component.email.invalid).toBeTrue();
    // Testing email existing
    spectator.inject(AuthService).exists.and.returnValue(of(true));
    spectator.typeInElement('marko@mail.com', '#email');
    expect(spectator.component.email.invalid).toBeTrue();
    // Testing email available (not existing)
    spectator.inject(AuthService).exists.and.returnValue(of(false));
    spectator.typeInElement('marko@mail.com', '#email');
    expect(spectator.component.email.valid).toBeTrue();

    // Testing wrong password confirmation
    spectator.typeInElement('passw0rd', '#password');
    spectator.typeInElement('passw1rd', '#confirmPassword');
    expect(spectator.component.registerForm.hasError('confirm')).toBeTrue();
    // Testing good password confirmation
    spectator.typeInElement('passw0rd', '#password');
    spectator.typeInElement('passw0rd', '#confirmPassword');
    expect(spectator.component.registerForm.hasError('confirm')).toBeFalse();
  });

  it('should not call authService.register() if form is invalid', () => {
    spectator = createSpectator();

    spectator.component.registerForm.setValue({
      email: 'marko',
      password: 'toto',
      confirmPassword: '',
      name: '',
    });

    spectator.click('button');
    expect(spectator.inject(AuthService).register).not.toHaveBeenCalled();
  });

  it('should redirect to / if register succeeds', () => {
    spectator = createSpectator();

    spectator.inject(AuthService).register.and.returnValue(of(null));
    spectator.inject(AuthService).exists.and.returnValue(of(false));

    spectator.component.registerForm.setValue({
      email: 'marko@mail.com',
      password: 'passw0rd',
      confirmPassword: 'passw0rd',
      name: 'Marko Askovic',
    });

    spectator.click('button');

    expect(spectator.inject(Router).navigateByUrl).toHaveBeenCalledWith('/');
  });

  it('should not redirect and show an error message if register fails', () => {
    spectator = createSpectator();

    spectator
      .inject(AuthService)
      .register.and.returnValue(throwError(() => null));
    spectator.inject(AuthService).exists.and.returnValue(of(false));

    spectator.component.registerForm.setValue({
      email: 'marko@mail.com',
      password: 'passw0rd',
      confirmPassword: 'passw0rd',
      name: 'Marko Askovic',
    });

    spectator.click('button');

    expect(spectator.inject(Router).navigateByUrl).not.toHaveBeenCalled();
    expect(spectator.query('.alert.bg-warning')).toExist();
  });
});
