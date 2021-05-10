import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { Environment } from 'src/app/environment/environment';
import { Test } from 'src/app/models/test';
import { RefreshTokenOnActionService } from 'src/app/services/refresh-token-on-action.service';
import { TestService } from 'src/app/services/test.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-review-test',
  templateUrl: './review-test.component.html',
  styleUrls: ['./review-test.component.scss'],
  providers: [TestService]
})
export class ReviewTestComponent implements OnInit {
  public test: Test;
  public url: string;
  public id: string;
  public reviewResponse: string;
  public saveReview$: Observable<any>;

  constructor(
    private _testService: TestService,
    private _refreshTokenService: RefreshTokenOnActionService,
    private _route:ActivatedRoute,
    private router: Router
  ) {
    this.test = new Test();
    this.url = Environment.url;
    this.reviewResponse = '';
    this.saveReview$ = null;
  }

  ngOnInit(): void {
    this.getParams();
    this.getReviewableTest();
  }

  getParams() {
    this._route.params.subscribe(
      params => {
        this.id = params.id
      }
    );
  }

  getReviewableTest() {
    this._testService.getReviewableTest(this.id).subscribe(
      res => {
        if (res.test) {
          this.test = res.test;
        }
      },
      err => {
        Swal.fire({
          title: 'Error al obtener examen',
          icon: 'error',
          text: err.error.message,
          background: 'rgba(0, 0, 0, 1)'
        });
      }
    );
  }

  async onSubmit() {
    if (await this._refreshTokenService.onAction()) {
      this.saveReview();
    }
  }

  saveReview() {
    if (this.saveReview$ == null) this.saveReview$ = this._testService.saveReview(this.test, this.reviewResponse).pipe(shareReplay(1));
    this.saveReview$.subscribe(
      res => {
        this.saveReview$ = null;
        if (res.message) {
          Swal.fire({
            title: 'Exito al guardar',
            icon: 'success',
            text: 'El examen se reviso correctamente.',
            background: 'rgba(0, 0, 0, 1)'
          }).then(()=>{
            this.router.navigate(['/doctor-examenes']);
          });
        }
      },
      err => {
        this.saveReview$ = null;
        Swal.fire({
          title: 'Error al guardar',
          icon: 'error',
          text: err.error.message,
          background: 'rgba(0, 0, 0, 1)'
        });
      }
    );
  }

  async unbindTest() {
    Swal.fire({
      title: 'Desligar examen?',
      icon: 'warning',
      text: 'Esta accion desligara el examen de usted, permitiendo el acceso a otros doctores.',
      background: 'rgba(0, 0, 0, 1)',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Desligar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (!result.isConfirmed) return;
      if (await this._refreshTokenService.onAction()) {
        this._testService.unbindTest(this.id).subscribe(
          res => {
            if (res.message) {
              Swal.fire({
                title: 'Exito al desligar examen',
                icon: 'success',
                text: res.message,
                background: 'rgba(0, 0, 0, 1)'
              }).then(()=>{
                this.router.navigate(['/doctor-examenes']);
              });
            }
          },
          err => {
            Swal.fire({
              title: 'Error al desligar examen',
              icon: 'error',
              text: err.error.message,
              background: 'rgba(0, 0, 0, 1)'
            });
          }
        );
      }
    });
  }
}