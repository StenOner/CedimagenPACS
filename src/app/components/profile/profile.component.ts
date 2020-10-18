import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Environment } from 'src/app/environment/environment';
import { User } from 'src/app/models/user';
import { DecypherTokenService } from 'src/app/services/decypher-token.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [UserService, DecypherTokenService]
})
export class ProfileComponent implements OnInit {
  public user:User;
  public route:string;

  constructor(
    private _userService:UserService,
    private _decypherTokenService:DecypherTokenService,
    private router:Router
  ){
    this.route = router.url;    
  }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(){
    const token = localStorage.getItem(Environment.accessKey);
    const payload = this._decypherTokenService.decodeToken(token);
    const id = payload._id;
    this._userService.getUser(id).subscribe(
      res=>{
        if (res.user) this.user = res.user;
        console.log(this.user);
      },
      err=>{
        console.log(err.error.message);
      }
    );
  }

}
