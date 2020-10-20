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
    private _authService:AuthService,
    private _decypherTokenService:DecypherTokenService,
    private router:Router
  ){
  }
  
  async onAction(){
    const accessToken = localStorage.getItem(Environment.accessKey);
    const refreshToken = localStorage.getItem(Environment.refreshKey);
    if (accessToken&&refreshToken){
      const isExpired = this._decypherTokenService.isTokenExpired(accessToken);
      if (isExpired){
        try{
          const res = await this._authService.refreshToken(accessToken, refreshToken).toPromise();
          localStorage.setItem(Environment.accessKey, res.accessToken);
          return true;
        }catch(err){
          this.removeItems();
          return false;
        }
      }else{
        return true;
      }
    }else{        
      this.removeItems();
      return false;
    }
  }

  removeItems(){
    localStorage.removeItem(Environment.accessKey);
    localStorage.removeItem(Environment.refreshKey);
    this.router.navigate(['/inicio-sesion']);
  }
}
