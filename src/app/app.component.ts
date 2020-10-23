import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { DecypherTokenService } from './services/decypher-token.service';

import { Environment } from './environment/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AuthService, UserService]
})
export class AppComponent implements DoCheck {
  public title:string;
  public userName:string;
  public route:string;
  public logout$:Observable<any>;

  constructor(
    private _authService:AuthService,
    private _decypherTokenService:DecypherTokenService,
    private router:Router
  ){
    this.title = 'Cedimagenteleradiologia';
    this.userName = '';
    this.route = router.url;
    this.logout$ = null;
  }

  getUserName(){
    const token = localStorage.getItem(Environment.accessKey);
    const payload = this._decypherTokenService.decodeToken(token);
    if (payload) this.userName = payload.userName;
  }

  ngDoCheck(){
    this.route = this.router.url;
    this.getUserName();
  }

  logout(){
    if (this.logout$ == null) this.logout$ = this._authService.logout().pipe(shareReplay(1));
    this.logout$.subscribe(
      res=>{
        if (res.message){
          localStorage.removeItem(Environment.accessKey);
          localStorage.removeItem(Environment.refreshKey);
          this.router.navigate(['/inicio-sesion']);
        }
      },
      err=>{
        console.log(err.error.message);
        this.logout$ = null;        
      }
    );
  }
}
