import {
  HttpMethod,
  SpectatorHttp,
  createHttpFactory,
} from '@ngneat/spectator';
import { AuthService, TOKEN_MANAGER } from './auth.service';
import { TokenManager } from './token-manager';
import { Observable, catchError, combineLatest, of, skip } from 'rxjs';

let storedToken: string | null = null;

const fakeTokenManager: TokenManager = {
  storeToken: function (token: string): Observable<string> {
    storedToken = token;
    return of(token);
  },
  loadToken: function (): Observable<string | null> {
    return of(storedToken);
  },
  removeToken: function (): Observable<boolean> {
    storedToken = null;
    return of(true);
  },
};

describe('AuthService', () => {
  let spectator: SpectatorHttp<AuthService>;

  const createSpectator = createHttpFactory({
    service: AuthService,
    providers: [{ provide: TOKEN_MANAGER, useValue: fakeTokenManager }],
  });

  beforeEach(() => {
    storedToken = null;
  });

  it('should set authStatus$ to TRUE if token is stored', (done: DoneFn) => {
    storedToken = 'MOCK_TOKEN';

    spectator = createSpectator();

    spectator.service.authStatus$.subscribe((status) => {
      expect(status).toBeTrue();
      done();
    });
  });

  it('should set authStatus$ to FALSE if no token is stored', (done: DoneFn) => {
    spectator = createSpectator();

    spectator.service.authStatus$.subscribe((status) => {
      expect(status).toBeFalse();
      done();
    });
  });

  it('should set authStatus$ to false and remove token when we call logout()', (done: DoneFn) => {
    storedToken = 'MOCK_TOKEN';

    spectator = createSpectator();

    spectator.service.logout();

    expect(storedToken).toBeNull();

    spectator.service.authStatus$.subscribe((status) => {
      expect(status).toBeFalse();
      done();
    });
  });

  it('should store token and set authStatus$ to TRUE if login() succeeds', (done: DoneFn) => {
    spectator = createSpectator();

    const login$ = spectator.service.login({
      email: 'mock@mail.com',
      password: 'passw0rd',
    });

    const authStatus$ = spectator.service.authStatus$.pipe(skip(1));

    combineLatest([login$, authStatus$]).subscribe(([token, status]) => {
      expect(token).toBe('MOCK_TOKEN');
      expect(storedToken).toBe('MOCK_TOKEN');
      expect(status).toBeTrue();
      done();
    });

    const req = spectator.expectOne(
      'https://x8ki-letl-twmt.n7.xano.io/api:cLAOENeS/auth/login',
      HttpMethod.POST
    );

    req.flush({
      authToken: 'MOCK_TOKEN',
    });
  });

  it('should not store token and authStatus$ should remain FALSE if login() fails', (done: DoneFn) => {
    spectator = createSpectator();

    const login$ = spectator.service
      .login({
        email: 'mock@mail.com',
        password: 'passw0rd',
      })
      .pipe(catchError(() => of('error')));

    const authStatus$ = spectator.service.authStatus$;

    combineLatest([login$, authStatus$]).subscribe(
      ([token, status]) => {
        // expect(token).toBe('error');
        expect(status).toBeFalse();
        expect(storedToken).toBeNull();
        done();
      }
      /*       error: () => {
        expect(storedToken).toBeNull();
        done();
      }, */
    );

    const req = spectator.expectOne(
      'https://x8ki-letl-twmt.n7.xano.io/api:cLAOENeS/auth/login',
      HttpMethod.POST
    );

    req.flush(
      {
        message: 'MOCK_ERROR_MESSAGE',
      },
      {
        status: 401,
        statusText: 'Unauthorized',
      }
    );
  });
});
