import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

import { Environment } from 'src/app/environment/environment';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  providers: [AuthService]
})
export class AuthComponent implements OnInit {
  public login$:Observable<any>;
  public logout$:Observable<any>;

  constructor(
    private _authService:AuthService,
    private router:Router
  ){
    this.login$ = null;
    this.logout$ = null;
  }

  ngOnInit(): void {
    if (localStorage.getItem(Environment.accessKey&&Environment.refreshKey)) this.router.navigate(['/home']);
  }

  onSubmit(email:string, password:string){
    this.login(email, password);
  }

  login(email:string, password:string){
    if(this.login$ == null) this.login$ = this._authService.login(email, password).pipe(shareReplay(1));
    this.login$.subscribe(
      res=>{
        if (res.accessToken&&res.refreshToken){
          localStorage.setItem(Environment.accessKey, res.accessToken);
          localStorage.setItem(Environment.refreshKey, res.refreshToken);
          this.router.navigate(['/home']);
        }
      },
      err=>{
        console.log(err.error.message);
        this.login$ = null
      }
    );
  }

  logout(){
    const token = localStorage.getItem(Environment.refreshKey);
    if (this.logout$ == null) this.logout$ = this._authService.logout(token).pipe(shareReplay(1));
    this.logout$.subscribe(
      res=>{
        if (res.message){
          localStorage.removeItem(Environment.accessKey);
          localStorage.removeItem(Environment.refreshKey);
        }
      },
      err=>{
        console.log(err.error.message);
        this.logout$ = null;        
      }
    );
  }

}
