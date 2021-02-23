import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { TranslateUserStatePipe } from 'src/app/pipes/translate-user-state.pipe';
import { RefreshTokenOnActionService } from 'src/app/services/refresh-token-on-action.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-get-users',
  templateUrl: './get-users.component.html',
  styleUrls: ['./get-users.component.scss'],
  providers: [UserService, RefreshTokenOnActionService]
})
export class GetUsersComponent implements OnInit {
  public users: User[];

  constructor(
    private _userService: UserService,
    private _refreshToken: RefreshTokenOnActionService
  ) {
    this.users = new Array();
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this._userService.getUsers().subscribe(
      res => {
        if (res.users) this.users = res.users;
      },
      err => {
        alert(err.error.message);
      }
    );
  }

  async deleteUser(user: User) {
    const action = user.state ? 'desactivar':'activar';
    let c = confirm(`Esta seguro que desea ${action} esta cuenta?`);
    if (c) {
      if (await this._refreshToken.onAction()) {
        user.state = !user.state;
        this._userService.updateUser(user).subscribe(
          res => {
            if (res.user) {
              alert('Usuario desactivado exitosamente.')
            }
          },
          err => {
            alert(err.error.message);
          }
        );
      }
    }
  }

}
