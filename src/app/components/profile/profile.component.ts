import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { Environment } from 'src/app/environment/environment';
import { User } from 'src/app/models/user';
import { UserType } from 'src/app/models/user-type';
import { DecypherTokenService } from 'src/app/services/decypher-token.service';
import { RefreshTokenOnActionService } from 'src/app/services/refresh-token-on-action.service';
import { UploadFileService } from 'src/app/services/upload-file.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [UserService, DecypherTokenService, RefreshTokenOnActionService, UploadFileService]
})
export class ProfileComponent implements OnInit {
  public user: User;
  public route: string;
  public typeDoctor: string;
  public fileToUpload: File;
  public updateProfile$: Observable<any>;
  public uploadFile$: Observable<any>;

  constructor(
    private _userService: UserService,
    private _decypherTokenService: DecypherTokenService,
    private _refreshTokenOnActionService: RefreshTokenOnActionService,
    private _uploadFileService: UploadFileService,
    private router: Router
  ) {
    this.route = '';
    this.user = new User();
    this.typeDoctor = Environment.doctor;
    this.fileToUpload = null;
    this.updateProfile$ = null;
    this.uploadFile$ = null;
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
        alert(err.error.message);
      }
    );
  }

  async onSubmit() {
    if (await this._refreshTokenOnActionService.onAction()) {
      this.updateProfile();
    }
  }

  updateProfile() {
    if (this.updateProfile$ == null) this.updateProfile$ = this._userService.updateProfile(this.user).pipe(shareReplay(1));
    this.updateProfile$.subscribe(
      res => {
        if (res.message) {
          if ((<UserType>this.user.userTypeID)._id === this.typeDoctor && this.fileToUpload != null) {
            this.updateProfile$ = null;
            this.uploadFile(this.user._id);
          }
          else {
            this.updateProfile$ = null
            alert('Perfil actualizado correctamente.');;
          }
        }
      },
      err => {
        alert(err.error.message);
      }
    );
  }

  uploadFile(userID?: string) {
    if (this.uploadFile$ == null) this.uploadFile$ = this._uploadFileService.uploadSign(userID, this.fileToUpload).pipe(shareReplay(1));
    this.uploadFile$.subscribe(
      res => {
        if (res.test) {
          this.uploadFile$ = null;
          alert('Perfil actualizado correctamente.');
        }
      },
      err => {
        this.uploadFile$ = null;
        alert(err.error.message);
      }
    );
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }
}
