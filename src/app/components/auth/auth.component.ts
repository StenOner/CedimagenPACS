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
  public rememberMe:boolean;
  public rememberEmail:string;

  constructor(
    private _authService:AuthService,
    private router:Router
  ){
    this.login$ = null;
    this.rememberMe = false;
    this.rememberEmail = '';
  }

  ngOnInit(): void {
    if (localStorage.getItem(Environment.accessKey&&Environment.refreshKey)) this.router.navigate(['/hogar']);
    this.getRemember();
  }

  setRememberMe(){
    localStorage.setItem(Environment.rememberMeKey, String(this.rememberMe));
    if (!this.rememberMe) this.removeRemember();
  }

  setRememberEmail(){
    if (this.rememberMe) localStorage.setItem(Environment.rememberEmailKey, this.rememberEmail);
  }

  setRemember(){
    this.setRememberMe();
    this.setRememberEmail();
  }

  getRemember(){
    let rememberMe = localStorage.getItem(Environment.rememberMeKey);
    let rememberEmail = localStorage.getItem(Environment.rememberEmailKey);
    if (rememberMe&&rememberEmail){
      this.rememberMe = (rememberMe == 'true');
      this.rememberEmail = rememberEmail;
      document.getElementById('password').focus();
    }else{
      this.removeRemember();
      document.getElementById('email').focus();
    }
  }

  removeRemember(){
    localStorage.removeItem(Environment.rememberMeKey);
    localStorage.removeItem(Environment.rememberEmailKey);
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
          this.router.navigate(['/hogar']);
        }
      },
      err=>{
        console.log(err.error.message);
        this.login$ = null
      }
    );
  }
}
