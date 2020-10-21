import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { RefreshTokenOnActionService } from './refresh-token-on-action.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizeGuardService implements CanActivate {

  constructor(
    private _refreshTokenOnActionService:RefreshTokenOnActionService,
  ){
  }
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):Promise<boolean>{
      return this._refreshTokenOnActionService.onAction();
  }
}
