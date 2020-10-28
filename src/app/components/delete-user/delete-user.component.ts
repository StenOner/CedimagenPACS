import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { Environment } from 'src/app/environment/environment';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { RefreshTokenOnActionService } from 'src/app/services/refresh-token-on-action.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss'],
  providers: [UserService, RefreshTokenOnActionService, AuthService]
})
export class DeleteUserComponent implements OnInit {
  @Input() public user: User;
  public password: string;
  public deleteUser$: Observable<any>;

  constructor(
    private _userService: UserService,
    private _refreshService: RefreshTokenOnActionService,
    private _authService: AuthService,
    private router: Router
  ) {
    this.user = new User();
    this.password = '';
    this.deleteUser$ = null;
  }

  ngOnInit(): void {
  }

  async onSubmit() {
    if (await this._refreshService.onAction()) {
      this.deleteUser();
    }
  }

  deleteUser() {
    if (this.deleteUser$ == null) this.deleteUser$ = this._userService.deleteUser(this.user.email, this.password).pipe(shareReplay(1));
    this.deleteUser$.subscribe(
      async res => {
        if (res.user) {
          try {
            const logout = await this._authService.logout().toPromise();
            if (logout.message) this.clearStorage();
          } catch (err) {
            this.deleteUser$ = null;
            console.log(err.error.message);
          }
        }
      },
      err => {
        this.deleteUser$ = null;
        console.log(err.error.message);
      }
    )
  }

  clearStorage() {
    localStorage.removeItem(Environment.accessKey);
    localStorage.removeItem(Environment.refreshKey);
    this.router.navigate(['/inicio-sesion']);
  }

}
