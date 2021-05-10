import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';

import { Environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url: string;

  constructor(
    private _http: HttpClient
  ) {
    this.url = Environment.url;
  }

  newUser(user: User): Observable<any> {
    const body = JSON.stringify(user);
    const accessToken = localStorage.getItem(Environment.accessKey);
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', accessToken);

    return this._http.post(`${this.url}new-user`, body, { headers: headers });
  }

  getUser(id: string): Observable<any> {
    const accessToken = localStorage.getItem(Environment.accessKey);
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', accessToken);

    return this._http.get(`${this.url}get-user/${id}`, { headers: headers });
  }

  getUsers(): Observable<any> {
    const accessToken = localStorage.getItem(Environment.accessKey);
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', accessToken);

    return this._http.get(`${this.url}get-users`, { headers: headers });
  }

  updateUser(user: User): Observable<any> {
    const body = JSON.stringify(user);
    const accessToken = localStorage.getItem(Environment.accessKey);
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', accessToken);

    return this._http.put(`${this.url}update-user/${user._id}`, body, { headers: headers });
  }

  updateProfile(user: User): Observable<any> {
    const body = JSON.stringify(user);
    const accessToken = localStorage.getItem(Environment.accessKey);
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', accessToken);

    return this._http.put(`${this.url}update-profile`, body, { headers: headers });
  }

  updateEmail(_id: string, newEmail: string): Observable<any> {
    const accessToken = localStorage.getItem(Environment.accessKey);
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', accessToken);

    return this._http.put(`${this.url}update-email`, { _id, newEmail }, { headers: headers });
  }

  updatePassword(email: string, oldPassword: string, newPassword1: string, newPassword2: string): Observable<any> {
    const accessToken = localStorage.getItem(Environment.accessKey);
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', accessToken);

    return this._http.put(`${this.url}update-password`, { email, oldPassword, newPassword1, newPassword2 }, { headers: headers });
  }

  confirmResetPassword(email: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post(`${this.url}confirm-reset-password`, { email }, { headers: headers });
  }

  generatePassword(id: string, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.get(`${this.url}generate-password/${id}/${token}`, { headers: headers });
  }

  adminResetPassword(id: string): Observable<any> {
    const accessToken = localStorage.getItem(Environment.accessKey);
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', accessToken);

    return this._http.get(`${this.url}a-reset-password/${id}`, { headers: headers });
  }

  deleteUser(email: string, password: string): Observable<any> {
    const accessToken = localStorage.getItem(Environment.accessKey);
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', accessToken);

    return this._http.post(`${this.url}delete-user`, { email, password }, { headers: headers });
  }
}
