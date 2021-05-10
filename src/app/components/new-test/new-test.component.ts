import { Component, OnInit } from '@angular/core';
import { Test } from 'src/app/models/test';
import { TestType } from 'src/app/models/test-type';
import { TestService } from 'src/app/services/test.service';
import { TestTypeService } from 'src/app/services/test-type.service';
import { UploadFileService } from 'src/app/services/upload-file.service';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { RefreshTokenOnActionService } from 'src/app/services/refresh-token-on-action.service';
import { Environment } from 'src/app/environment/environment';
import { DecypherTokenService } from 'src/app/services/decypher-token.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-test',
  templateUrl: './new-test.component.html',
  styleUrls: ['./new-test.component.scss'],
  providers: [TestService, TestTypeService, UploadFileService, DecypherTokenService, RefreshTokenOnActionService]
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
    private _decypherTokenService: DecypherTokenService,
    private _refreshService: RefreshTokenOnActionService,
    private router: Router
  ) {
    this.test = new Test();
    this.testTypes = new Array();
    this.newTest$ = null;
    this.fileToUpload = null;
    this.uploadFile$ = null;
  }

  ngOnInit(): void {
    this.getUserID();
    this.getTestTypes();
  }

  async onSubmit() {
    if (await this._refreshService.onAction()) {
      if (this.fileToUpload != null) {
        this.newTest();
      } else {
        Swal.fire({
          title: 'Error al enviar',
          icon: 'error',
          text: 'Debe seleccionar un archivo a subir.',
          background: 'rgba(0, 0, 0, 1)'
        });
      }
    }
  }

  newTest() {
    if (this.newTest$ == null) this.newTest$ = this._testService.newTest(this.test).pipe(shareReplay(1));
    this.newTest$.subscribe(
      res => {
        this.newTest$ = null;
        if (res.test) {
          setTimeout(() => {
            this.uploadFile(res.test._id);
          }, 0);
        }
      },
      err => {
        this.newTest$ = null;
        Swal.fire({
          title: 'Error al guardar',
          icon: 'error',
          text: err.error.message,
          background: 'rgba(0, 0, 0, 1)'
        });
      }
    );
  }

  uploadFile(testID?: string) {
    if (this.uploadFile$ == null) this.uploadFile$ = this._uploadFileService.uploadFile(testID, this.fileToUpload).pipe(shareReplay(1));
    this.uploadFile$.subscribe(
      res => {
        this.uploadFile$ = null;
        if (res.message) {
          Swal.fire({
            title: 'Exito al guardar',
            icon: 'success',
            text: 'El examen se guardo correctamente.',
            background: 'rgba(0, 0, 0, 1)'
          }).then(()=>{
            this.router.navigate(['/mis-examenes']);
          });
        }
      },
      err => {
        this.uploadFile$ = null;
        Swal.fire({
          title: 'Error al subir archivo',
          icon: 'error',
          text: err.error.message,
          background: 'rgba(0, 0, 0, 1)'
        });
      }
    );
  }

  getUserID() {
    const accessToken = localStorage.getItem(Environment.accessKey);
    const payload = this._decypherTokenService.decodeToken(accessToken);
    if (payload) this.test.clientID = payload._id;
  }

  getTestTypes() {
    this._testTypeService.getTestTypes().subscribe(
      res => {
        if (res.testTypes) {
          this.testTypes = res.testTypes;
        }
      },
      err => {
        Swal.fire({
          title: 'Error al obtener tipos de examen',
          icon: 'error',
          text: err.error.message,
          background: 'rgba(0, 0, 0, 1)'
        });
      }
    )
  }

  handleDateInput(name: string, date: Date) {
    const day = new Date(date).getDate() + 1;
    switch (name.toLowerCase()) {
      case 'testdate':
        this.test.patient.testDate = new Date(date);
        this.test.patient.testDate.setDate(day);
        break;
      case 'informdate':
        this.test.patient.informDate = new Date(date);
        this.test.patient.informDate.setDate(day);
        break;
      default:
        console.log('No se reconocio el atributo.');
        break;
    }
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }
}