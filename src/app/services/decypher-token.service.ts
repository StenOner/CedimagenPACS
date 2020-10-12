import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class DecypherTokenService {
  public jwtHelper:JwtHelperService;

  constructor(){
    this.jwtHelper = new JwtHelperService();
  }

  isTokenExpired(token:string){
    return this.jwtHelper.isTokenExpired(token);
  }

  decodeToken(token:string){
    return this.jwtHelper.decodeToken(token);
  }

  expirationDate(token:string){
    return this.jwtHelper.getTokenExpirationDate(token);
  }
}
