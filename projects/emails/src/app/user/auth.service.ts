import { BehaviorSubject, Subject } from 'rxjs';

export class AuthService {
  // authStatus = false;
  authStatus$ = new BehaviorSubject<boolean>(true);

  login() {
    console.log('On se connecte');
    //  this.authStatus = true;
    this.authStatus$.next(true);
  }

  logout() {
    console.log('On se déconnecte');
    //  this.authStatus = false;
    this.authStatus$.next(false);
  }
}
