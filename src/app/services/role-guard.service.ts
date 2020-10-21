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
    private _decypherTokenService:DecypherTokenService,
    private router:Router
  ){
  }
  
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):Promise<boolean>{
      const accessToken = localStorage.getItem(Environment.accessKey);
      const refreshToken = localStorage.getItem(Environment.refreshKey);
      const payload = this._decypherTokenService.decodeToken(accessToken);
      const expectedRole = route.data.expectedRole;
      if (!(accessToken&&refreshToken)){
        this.redirect();
        return false;
      }else{        
        const isExpired = this._decypherTokenService.isTokenExpired(accessToken);
        if (isExpired){
          try{
            const res = await this._authService.refreshToken(accessToken, refreshToken).toPromise();
            localStorage.setItem(Environment.accessKey, res.accessToken);
            if (payload.userTypeID!==expectedRole) return false;
            return true;
          }catch(err){
            this.removeItems();
            return false;
          }          
        }else{
          if (!this._decypherTokenService.decodeToken(accessToken).exp){
            this.removeItems();
            return false;
          }
          if (payload.userTypeID!==expectedRole) return false;
          return true;
        }
      }
  }

  removeItems(){
    this._authService.logout(localStorage.getItem(Environment.refreshKey)).toPromise();
    localStorage.removeItem(Environment.accessKey);
    localStorage.removeItem(Environment.refreshKey);
    this.redirect();
  }

  redirect(to:string = '/inicio-sesion'){
    this.router.navigate([to]);
  }
}
