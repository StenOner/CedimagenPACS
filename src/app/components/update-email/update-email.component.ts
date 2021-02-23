import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { RefreshTokenOnActionService } from 'src/app/services/refresh-token-on-action.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-update-email',
  templateUrl: './update-email.component.html',
  styleUrls: ['./update-email.component.scss'],
  providers: [UserService, RefreshTokenOnActionService]
})
export class UpdateEmailComponent implements OnInit {
  @Input() public user: User;
  public newEmail: string;

  constructor(
    private _userService: UserService,
    private _refreshTokenOnActionService: RefreshTokenOnActionService,
  ) {
    this.user = new User();
    this.newEmail = '';
  }

  ngOnInit(): void {
  }

  async onSubmit() {
    if (await this._refreshTokenOnActionService.onAction()) {
      this.updateEmail();
    }
  }

  updateEmail() {
    this._userService.updateEmail(this.user._id, this.newEmail).subscribe(
      res => {
        if (res.message) {
          alert('El correo ha sido actualizado correctamente.');
        }
      },
      err => {
        alert(err.error.message);
      }
    );
  }

}
