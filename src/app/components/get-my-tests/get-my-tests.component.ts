import { Component, OnInit } from '@angular/core';
import { Environment } from 'src/app/environment/environment';
import { Test } from 'src/app/models/test';
import { DecypherTokenService } from 'src/app/services/decypher-token.service';
import { RefreshTokenOnActionService } from 'src/app/services/refresh-token-on-action.service';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-get-my-tests',
  templateUrl: './get-my-tests.component.html',
  styleUrls: ['./get-my-tests.component.scss'],
  providers: [TestService, RefreshTokenOnActionService, DecypherTokenService]
})
export class GetMyTestsComponent implements OnInit {
  public myTests: Test[];
  public clientID: string;
  public url: string;

  constructor(
    private _testService: TestService,
    private _refreshTokenService: RefreshTokenOnActionService,
    private _decypherTokenService: DecypherTokenService
  ) {
    this.myTests = new Array();
    this.clientID = '';
    this.url = Environment.url;
  }

  ngOnInit(): void {
    this.getUserID();
    this.getMyTests();
  }

  getMyTests() {
    this._testService.getMyTests(this.clientID).subscribe(
      res => {
        if (res.tests) {
          this.myTests = res.tests;
        }
      },
      err => {
        console.log(err.error.message);
      }
    );
  }

  getUserID() {
    const accessToken = localStorage.getItem(Environment.accessKey);
    const payload = this._decypherTokenService.decodeToken(accessToken);
    if (payload) this.clientID = payload._id;
  }

  async deleteMyTest(id: string) {
    let c = confirm('Estas seguro que deseas eliminar este examen?');
    if (c) {
      if (await this._refreshTokenService.onAction()) {
        this._testService.deleteTest(id).subscribe(
          res => {
            if (res.test) {
              console.log('Examen eliminado exitosamente.');
              this.myTests = this.myTests.filter(
                test => test._id !== id
              );
            }
          },
          err => {
            console.log(err.error.message);
          }
        );
      }
    }
  }

}
