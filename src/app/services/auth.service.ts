import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public url:string;

  constructor(
    private _http:HttpClient
  ){
    this.url = Environment.url;
  }
    
  login(email:string, password:string):Observable<any>{
    const headers = new HttpHeaders().set('Content-Type','application/json');
    
    return this._http.post(`${this.url}auth`, {email, password}, {headers:headers});
  }

  refreshToken(accessToken:string, refreshToken:string):Observable<any>{
    const headers = new HttpHeaders().set('Content-Type','application/json');
    
    return this._http.post(`${this.url}refresh-auth`, {accessToken, refreshToken}, {headers:headers});
  }

  logout(token:string):Observable<any>{
    const headers = new HttpHeaders().set('Content-Type','application/json');
    
    return this._http.post(`${this.url}logout`, {token}, {headers:headers});
  }
}
