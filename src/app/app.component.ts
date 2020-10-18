import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { AuthService } from './services/auth.service';

import { Environment } from './environment/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AuthService]
})
export class AppComponent implements DoCheck {
  public title:string;
  public user:JSON;
  public route:string;
  public logout$:Observable<any>;

  constructor(
    private _authService:AuthService,
    private router:Router
  ){
    this.title = 'Cedimagenteleradiologia';
    this.route = router.url;
    this.logout$ = null;
  }

  ngDoCheck(){
    this.route = this.router.url;
  }

  logout(){
    if (this.logout$ == null) this.logout$ = this._authService.logout(localStorage.getItem(Environment.refreshKey)).pipe(shareReplay(1));
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
