import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { UserTypeService } from 'src/app/services/user-type.service';
import { RefreshTokenOnActionService } from 'src/app/services/refresh-token-on-action.service';
import { UserType } from 'src/app/models/user-type';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import Swal from 'sweetalert2';

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
        this.user$ = null;
        if (res.message) {
          Swal.fire({
            title: 'Exito al guardar',
            icon: 'success',
            text: 'El usuario se guardo correctamente.',
            background: 'rgba(0, 0, 0, 1)'
          }).then(()=>{
            this.router.navigate(['/usuarios']);
          });
        }
      },
      err => {
        this.user$ = null;
        Swal.fire({
          title: 'Error al guardar',
          icon: 'error',
          text: err.error.message,
          background: 'rgba(0, 0, 0, 1)'
        });
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
        Swal.fire({
          title: 'Error al obtener tipos de usuario',
          icon: 'error',
          text: err.error.message,
          background: 'rgba(0, 0, 0, 1)'
        });
      }
    );
  }
}