export class AuthService {
  authStatus = false;

  login() {
    console.log('On se connecte');
    this.authStatus = true;
  }

  logout() {
    console.log('On se déconnecte');
    this.authStatus = false;
  }
}
