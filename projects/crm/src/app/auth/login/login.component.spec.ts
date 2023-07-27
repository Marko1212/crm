import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { of, throwError } from 'rxjs';

describe('LoginComponent', () => {
  let spectator: Spectator<LoginComponent>;

  const createSpectator = createComponentFactory({
    component: LoginComponent,
    imports: [ReactiveFormsModule],
    mocks: [AuthService, Router],
  });

  it('should validate inputs', () => {
    spectator = createSpectator();

    // Testing required email
    spectator.typeInElement('', '#email');
    expect(spectator.component.email.invalid).toBeTrue();
    // Testing bad email
    spectator.typeInElement('toto', '#email');
    expect(spectator.component.email.invalid).toBeTrue();
    // Testing good email
    spectator.typeInElement('toto@gmail.com', '#email');
    expect(spectator.component.email.valid).toBeTrue();

    // Testing required password
    spectator.typeInElement('', '#password');
    expect(spectator.component.password.invalid).toBeTrue();
    // Testing too short password
    spectator.typeInElement('m3rk', '#password');
    expect(spectator.component.password.invalid).toBeTrue();
    // Testing password without digit
    spectator.typeInElement('password', '#password');
    expect(spectator.component.password.invalid).toBeTrue();
    // Testing good password
    spectator.typeInElement('passw0rd', '#password');
    expect(spectator.component.password.valid).toBeTrue();
  });

  it('should redirect to / if login succeeds', () => {
    spectator = createSpectator();

    spectator.inject(AuthService).login.and.returnValue(of(null));
    spectator.component.loginForm.setValue({
      email: 'marko@mail.com',
      password: 'passw0rd',
    });
    spectator.click('button');
    expect(spectator.inject(Router).navigateByUrl).toHaveBeenCalledWith('/');
  });

  it('should not call the service if form is invalid', () => {
    spectator = createSpectator();
    spectator.component.loginForm.setValue({
      email: 'marko',
      password: 'pass',
    });

    spectator.click('button');

    expect(spectator.inject(AuthService).login).not.toHaveBeenCalled();
  });

  it('should not redirect and show error if login fails', () => {
    spectator = createSpectator();

    spectator.inject(AuthService).login.and.returnValue(
      throwError(() => {
        return {
          error: {
            message: 'MOCK_MESSAGE',
          },
        };
      })
    );
    spectator.component.loginForm.setValue({
      email: 'marko@mail.com',
      password: 'passw0rd',
    });
    spectator.click('button');
    expect(spectator.inject(Router).navigateByUrl).not.toHaveBeenCalled();
    expect(spectator.query('.alert.bg-warning')).toExist();
    expect(spectator.query('.alert.bg-warning')).toHaveText('MOCK_MESSAGE');
  });
});
