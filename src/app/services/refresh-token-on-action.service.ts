import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { DecypherTokenService } from './decypher-token.service';

import { Environment } from 'src/app/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class RefreshTokenOnActionService {

  constructor(
    private _authService: AuthService,
    private _decypherTokenService: DecypherTokenService,
    private router: Router
  ) {
  }

  async onAction() {
    const accessToken = localStorage.getItem(Environment.accessKey);
    const refreshToken = localStorage.getItem(Environment.refreshKey);
    if (!(accessToken && refreshToken)) {
      this.redirect();
      return false;
    }
    const isExpired = this._decypherTokenService.isTokenExpired(accessToken);
    if (isExpired) {
      try {
        const res = await this._authService.refreshToken().toPromise();
        localStorage.setItem(Environment.accessKey, res.accessToken);
        return true;
      } catch (err) {
        this.removeItems();
        return false;
      }
    } 
    if (!(this._decypherTokenService.decodeToken(accessToken).exp)) {
      this.removeItems();
      return false;
    }
    return true;
  }

  private removeItems() {
    this._authService.logout().toPromise();
    localStorage.removeItem(Environment.accessKey);
    localStorage.removeItem(Environment.refreshKey);
    this.redirect();
  }

  private redirect(to: string = '/inicio-sesion') {
    this.router.navigate([to]);
  }
}