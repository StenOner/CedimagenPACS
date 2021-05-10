import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private isLoading: BehaviorSubject<boolean>;

  constructor() {
    this.isLoading = new BehaviorSubject<boolean>(false);
  }

  getLoader(): Observable<boolean> {
    return this.isLoading.asObservable();
  }

  startLoader() {
    this.isLoading.next(true)
  }

  endLoader() {
    this.isLoading.next(false);
  }
}