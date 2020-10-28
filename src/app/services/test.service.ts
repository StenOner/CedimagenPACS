import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Test } from 'src/app/models/test';

import { Environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  public url: string;

  constructor(
    private _http: HttpClient
  ) {
    this.url = Environment.url;
  }

  newTest(test: Test): Observable<any> {
    const body = JSON.stringify(test);
    const accessToken = localStorage.getItem(Environment.accessKey);
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', accessToken);

    return this._http.post(`${this.url}new-test`, body, { headers: headers });
  }
}
