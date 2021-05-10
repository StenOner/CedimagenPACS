import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(
    private _loaderService: LoaderService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> { 
    this._loaderService.startLoader();
    return next.handle(req).pipe(
      finalize(() => {
        this._loaderService.endLoader();
      })
    );
  }
}