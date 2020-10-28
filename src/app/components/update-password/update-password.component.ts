import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { RefreshTokenOnActionService } from 'src/app/services/refresh-token-on-action.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss'],
  providers: [UserService, RefreshTokenOnActionService]
})
export class UpdatePasswordComponent implements OnInit {
  @Input() public user: User;
  public password: string;
  public newPassword1: string;
  public newPassword2: string;

  constructor(
    private _userService: UserService,
    private _refreshTokenOnActionService: RefreshTokenOnActionService
  ) {
    this.user = new User();
    this.password = '';
    this.newPassword1 = '';
    this.newPassword2 = '';
  }

  ngOnInit(): void {
  }

  async onSubmit() {
    if (await this._refreshTokenOnActionService.onAction()) {
      if (this.newPassword1 === this.newPassword2) {
        this.updatePassword();
      } else {

      }
    }
  }

  updatePassword() {
    this._userService.updatePassword(this.user.email, this.password, this.newPassword1, this.newPassword2).subscribe(
      res => {
        if (res.message) {
          console.log(res.message);
        }
      },
      err => {
        console.log(err.error.message);
      }
    );
  }

}
