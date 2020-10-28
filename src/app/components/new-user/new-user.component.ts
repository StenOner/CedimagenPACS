import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

import { Environment } from 'src/app/environment/environment';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss'],
  providers: [UserService]
})
export class NewUserComponent implements OnInit {
  public email: string;
  public password: string;
  public confirmPassword: string;
  public user$: Observable<any>;

  constructor(
    private _userService: UserService,
    private router: Router
  ) {
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
    this.user$ = null;
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.password === this.confirmPassword) this.newUser();
  }

  newUser() {
    let user = new User();
    user.email = this.email;
    user.password = this.password;
    user.userTypeID = Environment.client;
    if (this.user$ == null) this.user$ = this._userService.newUser(user).pipe(shareReplay(1));
    this.user$.subscribe(
      res => {
        if (res.message) {
          this.router.navigate(['/inicio-sesion']);
        }
      },
      err => {
        this.user$ = null;
        console.log(err.error.message);
      }
    );
  }
}
