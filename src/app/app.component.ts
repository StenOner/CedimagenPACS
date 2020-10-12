import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

import { Environment } from './environment/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AuthService]
})
export class AppComponent implements OnInit, DoCheck {
  public title:string;
  public route:string;

  constructor(
    private _authService:AuthService,
    private router:Router
  ){
    this.title = 'Cedimagenteleradiologia';
    this.route = router.url;
  }

  ngOnInit(){
  }

  ngDoCheck(){
    this.route = this.router.url;
  }

  logout(){
    this._authService.logout(localStorage.getItem(Environment.refreshKey)).subscribe(
      res=>{
        if (res.message){
          localStorage.removeItem(Environment.accessKey);
          localStorage.removeItem(Environment.refreshKey);
          this.router.navigate(['/login']);
        }
      },
      err=>{
        console.log(err.error.message);
      }
    )
  }
}
