import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserType } from 'src/app/models/user-type';
import { RefreshTokenOnActionService } from 'src/app/services/refresh-token-on-action.service';
import { UserTypeService } from 'src/app/services/user-type.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss'],
  providers: [UserService, UserTypeService]
})
export class UpdateUserComponent implements OnInit {
  public id:string;
  public user:User;
  public userTypes:Array<UserType>;
  public userStates:Array<boolean>;

  constructor(
    private _userService:UserService,
    private _userTypeService:UserTypeService,
    private _refreshService:RefreshTokenOnActionService,
    private _route:ActivatedRoute
  ){
    this.id = '';
    this.user = new User();
    this.userTypes = new Array();
    this.userStates = [true, false];
  }

  ngOnInit(){
    this.getParams();
    this.getUser();
    this.getUserTypes();
  }

  async onSubmit(){
    if (await this._refreshService.onAction()){
      this.updateUser();
    }    
  }

  updateUser(){
    this._userService.updateUser(this.user).subscribe(
      res=>{
        if (res.user){
          console.log(res.user);
        }
      },
      err=>{
        console.log(err.error.message);
      }
    );
  }

  getParams(){
    this._route.params.subscribe(
      params=>{
        this.id = params.id;
      }
    );
  }

  getUser(){
    this._userService.getUser(this.id).subscribe(
      res=>{
        if (res.user){
          this.user = res.user;
        }
      },
      err=>{
        console.log(err.error.message);
      }
    );
  }

  getUserTypes(){
    this._userTypeService.getUserTypes().subscribe(
      res=>{
        if (res.userTypes){
          this.userTypes = res.userTypes;
        }
      },
      err=>{
        console.log(err.error.message);
      }
    );
  }
}
