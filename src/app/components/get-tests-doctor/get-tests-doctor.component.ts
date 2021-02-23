import { Component, OnInit } from '@angular/core';
import { Environment } from 'src/app/environment/environment';
import { Test } from 'src/app/models/test';
import { DecypherTokenService } from 'src/app/services/decypher-token.service';
import { RefreshTokenOnActionService } from 'src/app/services/refresh-token-on-action.service';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-get-tests-doctor',
  templateUrl: './get-tests-doctor.component.html',
  styleUrls: ['./get-tests-doctor.component.scss'],
  providers: [TestService, DecypherTokenService, RefreshTokenOnActionService]
})
export class GetTestsDoctorComponent implements OnInit {
  public url: string;
  public userID: string;
  public tests: Test[];

  constructor(
    private _testService: TestService,
    private _decypherTokenService: DecypherTokenService,
    private _refreshTokenService: RefreshTokenOnActionService
  ) {
    this.url = Environment.url;
    this.userID = '';
    this.tests = new Array();
  }

  ngOnInit(): void {
    this.getUserID();
    this.getTests();
  }

  getUserID() {
    const accessToken = localStorage.getItem(Environment.accessKey);
    const payload = this._decypherTokenService.decodeToken(accessToken);
    this.userID = payload._id;
  }

  getTests() {
    this._testService.getTests().subscribe(
      res => {
        if (res.tests) {
          this.tests = res.tests;
        }
      },
      err => {
        alert(err.error.message);
      }
    );
  }

  async openReview(id: string) {
    if (await this._refreshTokenService.onAction()) {
      await this._testService.openReview(id).toPromise();
    }
  }

}
