import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-get-users',
  templateUrl: './get-users.component.html',
  styleUrls: ['./get-users.component.scss'],
  providers: [UserService]
})
export class GetUsersComponent implements OnInit {
  public users:Array<User>;

  constructor(
    private _userService:UserService
  ){
    this.users = new Array();
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this._userService.getUsers().subscribe(
      res=>{
        if (res.users) this.users = res.users;
      },
      err=>{
        console.log(err.error.message);
      }
    );
  }

}
