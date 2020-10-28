import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { User } from './models/user';
import { AuthService } from './services/auth.service';
import { DecypherTokenService } from './services/decypher-token.service';

import { Environment } from './environment/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AuthService, DecypherTokenService]
})
export class AppComponent implements DoCheck {
  public title:string;
  public user:User;
  public route:string;
  public logout$:Observable<any>;
  public environment:any;

  constructor(
    private _authService:AuthService,
    private _decypherTokenService:DecypherTokenService,
    private router:Router
  ){
    this.title = 'Cedimagenteleradiologia';
    this.user = new User();
    this.route = '';
    this.logout$ = null;
    this.environment = Environment;
  }

  ngDoCheck(){
    this.route = this.router.url;
    this.getUserFromToken();
  }

  getUserFromToken(){
    const token = localStorage.getItem(Environment.accessKey);
    const payload = this._decypherTokenService.decodeToken(token);
    if (payload){
      this.user._id = payload._id;
      this.user.userTypeID = payload.userTypeID;
      this.user.userName = payload.userName;
      this.user.state = payload.state;
    }
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
