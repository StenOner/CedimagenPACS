import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {
  public url:string;

  constructor(
    private _http:HttpClient
  ){
    this.url = Environment.url;
  }

  uploadFile(id:string, file:File){
    const accessToken = localStorage.getItem(Environment.accessKey);
    const headers = new HttpHeaders().set('Authorization',accessToken);

    const formData = new FormData();
    formData.append('testFile', file, file.name);

    return this._http.put(`${this.url}upload-file/${id}`, formData, {headers:headers});
  }
}
