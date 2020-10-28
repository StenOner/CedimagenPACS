import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Environment } from 'src/app/environment/environment';
import { User } from 'src/app/models/user';
import { DecypherTokenService } from 'src/app/services/decypher-token.service';
import { RefreshTokenOnActionService } from 'src/app/services/refresh-token-on-action.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [UserService, DecypherTokenService, RefreshTokenOnActionService]
})
export class ProfileComponent implements OnInit {
  public user: User;
  public route: string;

  constructor(
    private _userService: UserService,
    private _decypherTokenService: DecypherTokenService,
    private _refreshTokenOnActionService: RefreshTokenOnActionService,
    private router: Router
  ) {
    this.route = '';
    this.user = new User();
  }

  ngOnInit(): void {
    this.route = this.router.url;
    this.getUser();
  }

  getUser() {
    const token = localStorage.getItem(Environment.accessKey);
    const payload = this._decypherTokenService.decodeToken(token);
    const id = payload._id;
    this._userService.getUser(id).subscribe(
      res => {
        if (res.user) this.user = res.user;
      },
      err => {
        console.log(err.error.message);
      }
    );
  }

  async onSubmit() {
    if (await this._refreshTokenOnActionService.onAction()) {
      this.updateProfile();
    }
  }

  updateProfile() {
    this._userService.updateProfile(this.user).subscribe(
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
