import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Environment } from 'src/app/environment/environment';
import { Test } from 'src/app/models/test';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-get-my-test',
  templateUrl: './get-my-test.component.html',
  styleUrls: ['./get-my-test.component.scss'],
  providers: [TestService]
})
export class GetMyTestComponent implements OnInit {
  public test: Test;
  public url: string;
  public id: string;

  constructor(
    private _testService: TestService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.test = new Test();
    this.url = Environment.url;
    this.id = '';
  }

  ngOnInit(): void {
    this.getParams();
    this.getMyTest();
  }

  getParams() {
    this.route.params.subscribe(
      params => {
        this.id = params.id;
      }
    );
  }

  getMyTest() {
    this._testService.getMyTest(this.id).subscribe(
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

  redirectDownload() {
    window.open(`${this.url}download/${this.test._id}-${this.test.responseFile}`, 'blank')
  }

}