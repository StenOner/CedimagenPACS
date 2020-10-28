import { Component, OnInit } from '@angular/core';
import { Test } from 'src/app/models/test';
import { TestType } from 'src/app/models/test-type';
import { TestService } from 'src/app/services/test.service';
import { TestTypeService } from 'src/app/services/test-type.service';
import { UploadFileService } from 'src/app/services/upload-file.service';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { RefreshTokenOnActionService } from 'src/app/services/refresh-token-on-action.service';

@Component({
  selector: 'app-new-test',
  templateUrl: './new-test.component.html',
  styleUrls: ['./new-test.component.scss'],
  providers: [TestService, TestTypeService]
})
export class NewTestComponent implements OnInit {
  public test: Test;
  public testTypes: TestType[];
  public newTest$: Observable<any>;
  public fileToUpload: File;
  public uploadFile$: Observable<any>;

  constructor(
    private _testService: TestService,
    private _testTypeService: TestTypeService,
    private _uploadFileService: UploadFileService,
    private _refreshService: RefreshTokenOnActionService
  ) {
    this.test = new Test();
    this.testTypes = new Array();
    this.newTest$ = null;
    this.fileToUpload = null;
    this.uploadFile$ = null;
  }

  ngOnInit(): void {
    this.getTestTypes();
  }

  async onSubmit() {
    if (await this._refreshService.onAction()) {
      if (this.fileToUpload != null) {
        this.newTest();
      }
    }
  }

  newTest() {
    if (this.newTest$ == null) this.newTest$ = this._testService.newTest(this.test).pipe(shareReplay(1));
    this.newTest$.subscribe(
      res => {
        if (res.test) {
          console.log('Guardado con exito.');
          this.uploadFile(res.test._id);
        }
      },
      err => {
        this.newTest$ = null;
        console.log(err.error.message);
      }
    )
  }

  uploadFile(testID?: string) {
    if (this.uploadFile$ == null) this.uploadFile$ = this._uploadFileService.uploadFile(testID, this.fileToUpload).pipe(shareReplay(1));
    this.uploadFile$.subscribe(
      res => {
        if (res.test) {
          console.log('archivo guardado exitosamente');
        }
      },
      err => {
        this.uploadFile$ = null;
        console.log(err.error.message);
      }
    );
  }

  getTestTypes() {
    this._testTypeService.getTestTypes().subscribe(
      res => {
        if (res.testTypes) {
          this.testTypes = res.testTypes;
        }
      },
      err => {
        console.log(err.error.message);
      }
    )
  }

  handleDateInput(name: string, date: string) {
    switch (name.toLowerCase()) {
      case 'testdate':
        this.test.patient.testDate = new Date(date);
        break;
      case 'informdate':
        this.test.patient.informDate = new Date(date);
        break;
      default:
        console.log('No se reconoce el atributo.');
        break;
    }
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

}
