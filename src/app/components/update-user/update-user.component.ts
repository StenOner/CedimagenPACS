import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserType } from 'src/app/models/user-type';
import { RefreshTokenOnActionService } from 'src/app/services/refresh-token-on-action.service';
import { UserTypeService } from 'src/app/services/user-type.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss'],
  providers: [UserService, UserTypeService, RefreshTokenOnActionService]
})
export class UpdateUserComponent implements OnInit {
  public id: string;
  public user: User;
  public userTypes: UserType[];
  public userStates: boolean[];

  constructor(
    private _userService: UserService,
    private _userTypeService: UserTypeService,
    private _refreshService: RefreshTokenOnActionService,
    private _route: ActivatedRoute,
    private router: Router
  ) {
    this.id = '';
    this.user = new User();
    this.userTypes = new Array();
    this.userStates = [true, false];
  }

  ngOnInit() {
    this.getParams();
    this.getUser();
    this.getUserTypes();
  }

  async onSubmit() {
    if (await this._refreshService.onAction()) {
      this.updateUser();
    }
  }

  updateUser() {
    this._userService.updateUser(this.user).subscribe(
      res => {
        if (res.user) {
          Swal.fire({
            title: 'Exito al actualizar',
            icon: 'success',
            text: 'El usuario se actualizo correctamente.',
            background: 'rgba(0, 0, 0, 1)'
          }).then(()=>{
            this.router.navigate(['/usuarios']);
          });
        }
      },
      err => {
        Swal.fire({
          title: 'Error al actualizar usuario',
          icon: 'error',
          text: err.error.message,
          background: 'rgba(0, 0, 0, 1)'
        });
      }
    );
  }

  getParams() {
    this._route.params.subscribe(
      params => {
        this.id = params.id;
      }
    );
  }

  getUser() {
    this._userService.getUser(this.id).subscribe(
      res => {
        if (res.user) {
          this.user = res.user;
        }
      },
      err => {
        Swal.fire({
          title: 'Error al obtener usuario',
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

  async onResetPassword() {
    if (this._refreshService.onAction()) {
      this.resetPassword();
    }
  }

  resetPassword() {
    Swal.fire({
      title: 'Resetear contraseña?',
      icon: 'warning',
      text: 'Resetear la contraseña del usuario.',
      background: 'rgba(0, 0, 0, 1)',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Resetear',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (!result.isConfirmed) return;
      this._userService.adminResetPassword(this.id).subscribe(
        res => {
          if (res.message) {
            Swal.fire({
              title: 'Exito al resetear la contraseña',
              icon: 'success',
              html: `La contraseña se reseteo correctamente a <b>${res.password}</b>`,
              background: 'rgba(0, 0, 0, 1)'
            });
          }
        },
        err => {
          Swal.fire({
            title: 'Error al resetear la contraseña',
            icon: 'error',
            text: err.error.message,
            background: 'rgba(0, 0, 0, 1)'
          });
        }
      );
    });
  }
}