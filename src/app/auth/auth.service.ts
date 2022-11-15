import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenExpirationTimer: any;

  constructor(private router: Router) {}

  autoLogout(expirationDuration: number = 30 * 60 * 1000) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logOut();
    }, expirationDuration);
  }

  clearLogOutTimer() {
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
  }

  public setToken(jwt: string) {
    sessionStorage.setItem('jwt', jwt);
  }

  public getToken(): string {
    const token = sessionStorage.getItem('jwt');
    return token ? token : '';
  }

  public logOut(): void {
    this.clearLogOutTimer();
    this.router.navigate(['/login']);
    sessionStorage.removeItem('jwt');
  }

  isAuthenticated(): boolean {
    return this.getToken().length > 0;
  }
}
