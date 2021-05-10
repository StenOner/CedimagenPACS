import { ChangeDetectorRef, Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { User } from './models/user';
import { AuthService } from './services/auth.service';
import { DecypherTokenService } from './services/decypher-token.service';
import { LoaderService } from './loader/loader.service';

import { Environment } from './environment/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AuthService, DecypherTokenService]
})
export class AppComponent implements OnInit, DoCheck {
  public title: string;
  public user: User;
  public route: string;
  public logout$: Observable<any>;
  public environment: any;
  public showLoader: boolean;

  constructor(
    private _authService: AuthService,
    private _decypherTokenService: DecypherTokenService,
    private _loaderService: LoaderService,
    private cdRef: ChangeDetectorRef,
    private router: Router
  ) {
    this.title = 'Cedimagenteleradiologia';
    this.user = new User();
    this.route = '';
    this.logout$ = null;
    this.environment = Environment;
    this.showLoader = false;
  }

  ngOnInit() {
    this.handleLoader();
  }

  ngDoCheck() {
    this.route = this.router.url;
    this.getUserFromToken();
  }

  handleLoader() {
    this._loaderService.getLoader().subscribe((isLoading) => {
      this.showLoader = isLoading;
      this.cdRef.detectChanges();
    });
  }

  getUserFromToken() {
    const token = localStorage.getItem(Environment.accessKey);
    const payload = this._decypherTokenService.decodeToken(token);
    if (payload) {
      this.user._id = payload._id;
      this.user.userTypeID = payload.userTypeID;
      this.user.userName = payload.userName;
      this.user.state = payload.state;
    }
  }

  logout() {
    if (this.logout$ == null) this.logout$ = this._authService.logout().pipe(shareReplay(1));
    this.logout$.subscribe(
      res => {
        this.logout$ = null;
        if (res.message) {
          localStorage.removeItem(Environment.accessKey);
          localStorage.removeItem(Environment.refreshKey);
          this.router.navigate(['/inicio-sesion']);
        }
      },
      err => {
        this.logout$ = null;
        Swal.fire({
          title: 'Error al desconectar',
          icon: 'error',
          text: err.error.message,
          background: 'rgba(0, 0, 0, 1)'
        });
      }
    );
  }
}