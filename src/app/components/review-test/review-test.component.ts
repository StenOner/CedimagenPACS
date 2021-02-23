import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { Environment } from 'src/app/environment/environment';
import { Test } from 'src/app/models/test';
import { RefreshTokenOnActionService } from 'src/app/services/refresh-token-on-action.service';
import { TestService } from 'src/app/services/test.service';

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
        alert(err.error.message);
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
        if (res.message) {
          alert('El examen se reviso exitosamente.');
          this.router.navigate(['/doctor-examenes']);
        }
      },
      err => {
        this.saveReview$ = null;
        alert(err.error.message);
      },
    );
  }
}
