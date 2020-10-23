import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-get-user',
  templateUrl: './get-user.component.html',
  styleUrls: ['./get-user.component.scss'],
  providers: [UserService]
})
export class GetUserComponent implements OnInit {
  public user:User;
  public id:string;
  public userStates:Array<boolean>;

  constructor(
    private _userService:UserService,
    private route:ActivatedRoute
  ){
    this.user = new User();
    this.id = '';
    this.userStates = [true,false];
  }

  ngOnInit(): void {
    this.getParams();
    this.getUser();
  }

  getParams(){
    this.route.params.subscribe(
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
    )
  }

}
