import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { UserTypeService } from 'src/app/services/user-type.service';
import { RefreshTokenOnActionService } from 'src/app/services/refresh-token-on-action.service';
import { UserType } from 'src/app/models/user-type';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-new-user-admin',
  templateUrl: './new-user-admin.component.html',
  styleUrls: ['./new-user-admin.component.scss'],
  providers: [UserService, UserTypeService, RefreshTokenOnActionService]
})
export class NewUserAdminComponent implements OnInit {
  public user: User;
  public userTypes: UserType[];
  public userStates: boolean[];
  public user$: Observable<any>;

  constructor(
    private _userService: UserService,
    private _userTypeService: UserTypeService,
    private _refreshService: RefreshTokenOnActionService,
    private router: Router
  ) {
    this.user = new User();
    this.userTypes = new Array();
    this.userStates = [true, false];
    this.user$ = null;
  }

  ngOnInit(): void {
    this.getUserTypes();
  }

  async onSubmit() {
    if (await this._refreshService.onAction()) {
      this.newUser();
    }
  }

  newUser() {
    if (this.user$ == null) this.user$ = this._userService.newUser(this.user).pipe(shareReplay(1));
    this.user$.subscribe(
      res => {
        if (res.message) {
          alert('Usuario creado con exito.');
          this.router.navigate(['/usuarios']);
        }
      },
      err => {
        this.user$ = null;
        alert(err.error.message);
      }
    );
  }

  getUserTypes() {
    this._userTypeService.getUserTypes().subscribe(
      res => {
        if (res.userTypes) {
          this.userTypes = res.userTypes;
        }
      },
      err => {
        alert(err.error.message);
      }
    );
  }

}
