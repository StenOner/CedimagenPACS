import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { Environment } from 'src/app/environment/environment';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  providers: [UserService]
})
export class ResetPasswordComponent implements OnInit {
  public user$: Observable<any>;
  public userEmail: string;

  constructor(
    private _userService: UserService,
    private router: Router
  ) {
    this.user$ = null;
    this.userEmail = '';
  }

  ngOnInit(): void {
    if (localStorage.getItem(Environment.accessKey && Environment.refreshKey)) this.router.navigate(['/hogar']);
  }

  onSubmit(email: string) {
    this.confirmResetPassword(email);
  }

  confirmResetPassword(email: string) {
    if (this.user$ == null) this.user$ = this._userService.confirmResetPassword(email).pipe(shareReplay(1));
    this.user$.subscribe(
      res => {
        this.user$ = null;
        if (res.message && res.token) {
          localStorage.setItem(Environment.recoveryPasswordKey, res.token);
          Swal.fire({
            title: 'Exito al recibir peticion',
            icon: 'success',
            text: res.message,
            background: 'rgba(0, 0, 0, 1)'
          }).then(()=>{
            this.router.navigate(['/inicio-sesion']);
          });
        }
      },
      err => {
        this.user$ = null;
        Swal.fire({
          title: 'Error al encontrar usuario',
          icon: 'error',
          text: err.error.message,
          background: 'rgba(0, 0, 0, 1)'
        });
      }
    );
  }
}