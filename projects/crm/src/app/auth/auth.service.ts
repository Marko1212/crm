import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { BehaviorSubject, Subscription, map, tap } from 'rxjs';
import { TokenManager } from './token-manager';
import { environment } from '../../environments/environment.development';

const API_URL = environment.apiUrl;

export type RegisterData = {
  email: string;
  name: string;
  password: string;
};

export type LoginData = {
  email: string;
  password: string;
};

export type LoginApiResponse = { authToken: string };

export const TOKEN_MANAGER = new InjectionToken(
  'La classe à injecter pour stocker le token'
);

@Injectable()
export class AuthService {
  subscription?: Subscription;
  authStatus$ = new BehaviorSubject(false);

  constructor(
    private http: HttpClient,
    @Inject(TOKEN_MANAGER) private tokenManager: TokenManager
  ) {
    this.subscription = this.tokenManager.loadToken().subscribe((token) => {
      if (token) {
        this.authStatus$.next(true);
      }
    });
  }

  register(registerData: RegisterData) {
    return this.http.post(API_URL + '/auth/signup', registerData);
  }

  exists(email: string) {
    return this.http
      .post<{ exists: boolean }>(API_URL + '/user/validation/exists', {
        email,
      })
      .pipe(map((response) => response.exists));
  }

  login(loginData: LoginData) {
    return this.http
      .post<LoginApiResponse>(API_URL + '/auth/login', loginData)
      .pipe(
        map((response) => response.authToken),
        tap((token) => {
          this.tokenManager.storeToken(token);
          this.authStatus$.next(true);
        })
      );
  }

  get authToken() {
    return this.tokenManager.loadToken();
  }

  logout() {
    this.authStatus$.next(false);
    this.tokenManager.removeToken();
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
