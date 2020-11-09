import { Component, OnInit } from '@angular/core';
import { Environment } from 'src/app/environment/environment';
import { Test } from 'src/app/models/test';
import { TranslateUserStatePipe } from 'src/app/pipes/translate-user-state.pipe';
import { RefreshTokenOnActionService } from 'src/app/services/refresh-token-on-action.service';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-get-tests-admin',
  templateUrl: './get-tests-admin.component.html',
  styleUrls: ['./get-tests-admin.component.scss'],
  providers: [TestService, RefreshTokenOnActionService, TranslateUserStatePipe]
})
export class GetTestsAdminComponent implements OnInit {
  public url: string;
  public tests: Test[];

  constructor(
    private _testService: TestService,
    private _refreshToken: RefreshTokenOnActionService,
    private translateUserStatePipe: TranslateUserStatePipe
  ) {
    this.url = Environment.url;
    this.tests = new Array();
  }

  ngOnInit(): void {
    this.getTests();
  }

  getTests() {
    this._testService.getTests().subscribe(
      res => {
        if (res.tests){
          this.tests = res.tests;
        }
      },
      err => {
        console.log(err.error.message);
      }
    )
  }

  async deleteTest(test: Test) {
    let c = confirm(`Estas seguro que deseas cambiar el estado de este examen a ${this.translateUserStatePipe.transform(String(!test.state))}?`);
    if (c) {
      if (await this._refreshToken.onAction()) {
        test.state = !test.state;
        this._testService.updateTest(test).subscribe(
          res => {
            if (res.test) {

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
