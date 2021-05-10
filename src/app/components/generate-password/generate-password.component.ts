import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Environment } from 'src/app/environment/environment';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-generate-password',
  templateUrl: './generate-password.component.html',
  styleUrls: ['./generate-password.component.scss'],
  providers: [UserService]
})
export class GeneratePasswordComponent implements OnInit {
  public id: string;
  public recoveryToken: string;

  constructor(
    private _userService: UserService,
    private _route: ActivatedRoute,
    private router: Router
  ) {
    this.id = '';
  }

  ngOnInit(): void {
    this.getParams();
    this.getRecoveryToken();
    this.generatePassword();
  }

  generatePassword() {
    this._userService.generatePassword(this.id, this.recoveryToken).subscribe(
      res => {
        if (res.message) {
          localStorage.removeItem(Environment.recoveryPasswordKey);
          Swal.fire({
            title: 'Exito al generar contraseña',
            icon: 'success',
            text: res.message,
            background: 'rgba(0, 0, 0, 1)'
          }).then(()=>{
            this.router.navigate(['/inicio-sesion']);
          });
        }
      },
      err => {
        Swal.fire({
          title: 'Error al generar contraseña',
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

  getRecoveryToken() {
    this.recoveryToken = localStorage.getItem(Environment.recoveryPasswordKey);
  }
}