import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { DecypherTokenService } from './decypher-token.service';

import { Environment } from 'src/app/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {

  constructor(
    private _authService:AuthService,
    private _decypherToken:DecypherTokenService,
    private router:Router
  ){
  }
  
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):Promise<boolean>{
      const accessToken = localStorage.getItem(Environment.accessKey);
      const refreshToken = localStorage.getItem(Environment.refreshKey);
      const payload = this._decypherToken.decodeToken(accessToken);
      const expectedRole = route.data.expectedRole;
      if (accessToken&&refreshToken){
        const isExpired = this._decypherToken.isTokenExpired(accessToken);
        if (isExpired){
          try{
            const res = await this._authService.refreshToken(accessToken, refreshToken).toPromise();
            localStorage.setItem(Environment.accessKey, res.accessToken);
            if (payload.userTypeID===expectedRole) return true;
            return false;
          }catch(err){
            this.removeItems();
            return false;
          }          
        }else{
          if (payload.userTypeID===expectedRole) return true;
          return false;
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
