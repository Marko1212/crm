import { SpectatorHttp, createHttpFactory } from '@ngneat/spectator';
import { AuthService, TOKEN_MANAGER } from './auth.service';
import { TokenManager } from './token-manager';
import { Observable, of } from 'rxjs';

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
});
