import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from './user/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private auth: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.auth.authStatus$.pipe(
      map((authStatus) => {
        if (authStatus) return true;
        return this.router.parseUrl('/account/login');
      })
    );
    /*     if (this.auth.authStatus) {
      return true;
    }
    return this.router.parseUrl('/account/login'); */
  }
}
