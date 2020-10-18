import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class TestTypeService {
  public url:string;

  constructor(
    private _http:HttpClient
  ){
    this.url = Environment.url;
  }

  getTestType(id:string):Observable<any>{
    const headers = new HttpHeaders().set('Content-Type','application/json');

    return this._http.get(`${this.url}get-testType/${id}`, {headers:headers});
  }

  getTestTypes():Observable<any>{
    const headers = new HttpHeaders().set('Content-Type','application/json');

    return this._http.get(`${this.url}get-testTypes`, {headers:headers});
  }
}
