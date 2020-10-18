import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class UserTypeService {
  public url:string;

  constructor(
    private _http:HttpClient
  ){
    this.url = Environment.url;
  }

  getUserType(id:string):Observable<any>{
    const headers = new HttpHeaders().set('Content-Type','application/json');

    return this._http.get(`${this.url}get-userType/${id}`, {headers:headers});
  }

  getUserTypes():Observable<any>{
    const headers = new HttpHeaders().set('Content-Type','application/json');

    return this._http.get(`${this.url}get-userTypes`, {headers:headers});
  }
}
