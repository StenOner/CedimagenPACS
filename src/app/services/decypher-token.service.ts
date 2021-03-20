import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class DecypherTokenService {
  private _jwtHelper: JwtHelperService;

  constructor() {
    this._jwtHelper = new JwtHelperService();
  }

  isTokenExpired(token: string) {
    return this._jwtHelper.isTokenExpired(token);
  }

  decodeToken(token: string) {
    return this._jwtHelper.decodeToken(token);
  }

  expirationDate(token: string) {
    return this._jwtHelper.getTokenExpirationDate(token);
  }
}
