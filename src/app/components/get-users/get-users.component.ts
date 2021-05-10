import { TitleCasePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from 'src/app/models/user';
import { RefreshTokenOnActionService } from 'src/app/services/refresh-token-on-action.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

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
        Swal.fire({
          title: 'Error al obtener usuarios',
          icon: 'error',
          text: err.error.message,
          background: 'rgba(0, 0, 0, 1)'
        });
      }
    );
  }

  async deleteUser(user: User) {
    const action = user.state ? 'desactivar':'activar';
    Swal.fire({
      title: `${new TitleCasePipe().transform(action)} usuario`,
      icon: 'warning',
      text: `Esta seguro que desea ${action} este usuario?`,
      background: 'rgba(0, 0, 0, 1)',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `${new TitleCasePipe().transform(action)}`,
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (!result.isConfirmed) return;
      if (await this._refreshToken.onAction()) {
        user.state = !user.state;
        this._userService.updateUser(user).subscribe(
          res => {
            if (res.user) {
              Swal.fire({
                title: 'Exito al actualizar',
                icon: 'success',
                text: user.state ? 'El usuario se activo correctamente.' : 'El usuario se desactivo correctamente.',
                background: 'rgba(0, 0, 0, 1)'
              });
            }
          },
          err => {
            user.state = !user.state;
            Swal.fire({
              title: 'Error al actualizar',
              icon: 'error',
              text: err.error.message,
              background: 'rgba(0, 0, 0, 1)'
            });
          }
        );
      }
    });
  }
}