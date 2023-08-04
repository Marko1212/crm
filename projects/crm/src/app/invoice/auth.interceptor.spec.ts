import {
  HttpMethod,
  SpectatorHttp,
  createHttpFactory,
} from '@ngneat/spectator';
import { AuthInterceptor } from './auth.interceptor';
import { AuthService } from '../auth/auth.service';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

describe('AuthInterceptor', () => {
  let spectator: SpectatorHttp<AuthInterceptor>;

  const createSpectator = createHttpFactory({
    service: AuthInterceptor,
    mocks: [AuthService],
    providers: [
      {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true,
      },
    ],
  });

  it('should not act on the request if it does not concern /invoice', () => {
    spectator = createSpectator();

    const http = spectator.inject(HttpClient);

    http.get(environment.apiUrl + '/users').subscribe();

    const req = spectator.expectOne(
      environment.apiUrl + '/users',
      HttpMethod.GET
    );

    expect(req.request.headers.has('Authorization')).toBeFalse();
  });
});
