import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class MoviesKeyInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const params = 'api_key=71f035c93479d9a4a3d2ab8354f783d0&language=fr-FR';
    const requestWithParams = req.clone({
      url: req.url + (req.url.includes('?') ? `&${params}` : `?${params}`),
    });

    return next.handle(requestWithParams);
  }
}
