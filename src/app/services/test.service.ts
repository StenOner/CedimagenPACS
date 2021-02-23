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

  getTest(id: string): Observable<any> {
    const accessToken = localStorage.getItem(Environment.accessKey);
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', accessToken);

    return this._http.get(`${this.url}get-test/${id}`, { headers: headers });
  }

  getMyTest(id: string): Observable<any> {
    const accessToken = localStorage.getItem(Environment.accessKey);
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', accessToken);

    return this._http.get(`${this.url}get-my-test/${id}`, { headers: headers });
  }

  getTests(): Observable<any> {
    const accessToken = localStorage.getItem(Environment.accessKey);
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', accessToken);

    return this._http.get(`${this.url}get-tests`, { headers: headers });
  }

  getMyTests(id: string): Observable<any> {
    const accessToken = localStorage.getItem(Environment.accessKey);
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', accessToken);

    return this._http.get(`${this.url}get-my-tests/${id}`, { headers: headers });
  }

  getReviewableTest(id: string): Observable<any> {
    const accessToken = localStorage.getItem(Environment.accessKey);
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', accessToken);

    return this._http.get(`${this.url}get-reviewable-test/${id}`, { headers: headers });
  }

  openReview(id: string): Observable<any> {
    const accessToken = localStorage.getItem(Environment.accessKey);
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', accessToken);

    return this._http.put(`${this.url}open-review/${id}`, null, { headers: headers });
  }

  saveReview(test: Test, review: string): Observable<any> {
    const body = JSON.stringify(Object.assign({}, test, {review}));
    const accessToken = localStorage.getItem(Environment.accessKey);
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', accessToken);
    
    return this._http.put(`${this.url}save-review`, body, { headers: headers });
  }

  updateTest(test: Test): Observable<any> {
    const body = JSON.stringify(test);
    const accessToken = localStorage.getItem(Environment.accessKey);
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', accessToken);

    return this._http.put(`${this.url}update-test/${test._id}`, body, { headers: headers });
  }

  updateMyTest(test: Test): Observable<any> {
    const body = JSON.stringify(test);
    const accessToken = localStorage.getItem(Environment.accessKey);
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', accessToken);

    return this._http.put(`${this.url}update-my-test/${test._id}`, body, { headers: headers });
  }

  deleteTest(id: string): Observable<any> {
    const accessToken = localStorage.getItem(Environment.accessKey);
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', accessToken);

    return this._http.delete(`${this.url}delete-test/${id}`, { headers: headers });
  }
}
