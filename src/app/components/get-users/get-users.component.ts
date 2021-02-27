import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from 'src/app/models/user';
import { RefreshTokenOnActionService } from 'src/app/services/refresh-token-on-action.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-get-users',
  templateUrl: './get-users.component.html',
  styleUrls: ['./get-users.component.scss'],
  providers: [UserService, RefreshTokenOnActionService]
})
export class GetUsersComponent implements OnDestroy, OnInit {
  public users: User[];
  public dtOptions: DataTables.Settings;
  public dtTrigger: Subject<any>;

  constructor(
    private _userService: UserService,
    private _refreshToken: RefreshTokenOnActionService
  ) {
    this.users = new Array();
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 25,
      language: {
        url: '../../../assets/datatable/spanish.json'
      }
    };
    this.dtTrigger = new Subject<any>();
    this.getUsers();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  getUsers() {
    this._userService.getUsers().subscribe(
      res => {
        if (res.users) {
          this.users = res.users;
          this.dtTrigger.next();
        }
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
