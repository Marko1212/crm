import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, tap } from 'rxjs';

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

@Injectable()
export class AuthService {
  authStatus$ = new BehaviorSubject(false);
  authToken: string | null = null;

  constructor(private http: HttpClient) {}

  register(registerData: RegisterData) {
    return this.http.post(
      'https://x8ki-letl-twmt.n7.xano.io/api:cLAOENeS/auth/signup',
      registerData
    );
  }

  exists(email: string) {
    return this.http
      .post<{ exists: boolean }>(
        'https://x8ki-letl-twmt.n7.xano.io/api:cLAOENeS/user/validation/exists',
        {
          email,
        }
      )
      .pipe(map((response) => response.exists));
  }

  login(loginData: LoginData) {
    return this.http
      .post<LoginApiResponse>(
        'https://x8ki-letl-twmt.n7.xano.io/api:cLAOENeS/auth/login',
        loginData
      )
      .pipe(
        map((response) => response.authToken),
        tap((token) => {
          this.authToken = token;
          this.authStatus$.next(true);
        })
      );
  }

  logout() {
    this.authStatus$.next(false);
  }
}
