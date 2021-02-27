import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Environment } from 'src/app/environment/environment';
import { Test } from 'src/app/models/test';
import { RefreshTokenOnActionService } from 'src/app/services/refresh-token-on-action.service';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-get-tests-admin',
  templateUrl: './get-tests-admin.component.html',
  styleUrls: ['./get-tests-admin.component.scss'],
  providers: [TestService, RefreshTokenOnActionService]
})
export class GetTestsAdminComponent implements OnDestroy, OnInit {
  public url: string;
  public tests: Test[];
  public dtOptions: DataTables.Settings;
  public dtTrigger: Subject<any>;

  constructor(
    private _testService: TestService,
    private _refreshToken: RefreshTokenOnActionService
  ) {
    this.url = Environment.url;
    this.tests = new Array();
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 25,
      language: {
        url: '../../../assets/datatable/spanish.json'
      }
    };
    this.dtTrigger = new Subject<any>();
    this.getTests();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  getTests() {
    this._testService.getTests().subscribe(
      res => {
        if (res.tests){
          this.tests = res.tests;
          this.dtTrigger.next();
        }
      },
      err => {
        alert(err.error.message);
      }
    );
  }

  async deleteTest(test: Test) {
    const action = test.state ? 'desactivar':'activar';
    let c = confirm(`Esta seguro que desea ${action} este examen?`);
    if (c) {
      if (await this._refreshToken.onAction()) {
        test.state = !test.state;
        this._testService.updateTest(test).subscribe(
          res => {
            if (res.test) {
              alert('Examen desactivado exitosamente.')
            }
          },
          err => {
            alert(err.error.message);
          }
        );
      }
    }
  }

}
