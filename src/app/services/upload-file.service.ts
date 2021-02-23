import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {
  public url: string;

  constructor(
    private _http: HttpClient
  ) {
    this.url = Environment.url;
  }

  uploadSign(id: string, file: File) {
    const accessToken = localStorage.getItem(Environment.accessKey);
    const headers = new HttpHeaders().set('Authorization', accessToken);

    const formData = new FormData();
    formData.append('sign', file, file.name);
    formData.append('id', id);

    return this._http.post(`${this.url}upload-sign`, formData, { headers: headers });
  }

  uploadFile(id: string, file: File) {
    const accessToken = localStorage.getItem(Environment.accessKey);
    const headers = new HttpHeaders().set('Authorization', accessToken);

    const formData = new FormData();
    formData.append('testFile', file, file.name);
    formData.append('id', id);

    return this._http.post(`${this.url}upload-file`, formData, { headers: headers });
  }

  download(file: string) {
    const accessToken = localStorage.getItem(Environment.accessKey);
    const headers = new HttpHeaders().set('Authorization', accessToken);

    return this._http.get(`${this.url}download/${file}`, { headers: headers });
  }
}
