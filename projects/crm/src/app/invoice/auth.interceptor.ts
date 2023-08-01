import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { environment } from '../../environments/environment.development';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Si je ne travaille pas sur des invoices
    if (!req.url.startsWith(environment.apiUrl + '/invoice')) {
      // je laisse les choses continuer
      return next.handle(req);
    }

    return this.auth.authToken.pipe(
      tap((token) => {
        if (!token) {
          throw new Error("Aucun token d'authentification");
        }
      }),
      switchMap((token) => {
        const reqWithToken = req.clone({
          headers: new HttpHeaders({
            Authorization: `Bearer ${token}`,
          }),
        });
        return next.handle(reqWithToken);
      })
    );
  }
}
