import { Component, OnInit } from '@angular/core';
import { Test } from 'src/app/models/test';
import { TestType } from 'src/app/models/test-type';
import { TestService } from 'src/app/services/test.service';
import { TestTypeService } from 'src/app/services/test-type.service';
import { UploadFileService } from 'src/app/services/upload-file.service';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { RefreshTokenOnActionService } from 'src/app/services/refresh-token-on-action.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-my-test',
  templateUrl: '../new-test/new-test.component.html',
  styleUrls: ['./update-my-test.component.scss'],
  providers: [TestService, TestTypeService, UploadFileService, RefreshTokenOnActionService]
})
export class UpdateMyTestComponent implements OnInit {
  public id: string;
  public test: Test;
  public testTypes: TestType[];
  public updateTest$: Observable<any>;
  public fileToUpload: File;
  public uploadFile$: Observable<any>;

  constructor(
    private _testService: TestService,
    private _testTypeService: TestTypeService,
    private _uploadFileService: UploadFileService,
    private _refreshService: RefreshTokenOnActionService,
    private _route: ActivatedRoute,
    private router: Router
  ) {
    this.id = '';
    this.test = new Test();
    this.testTypes = new Array();
    this.updateTest$ = null;
    this.fileToUpload = null;
    this.uploadFile$ = null;
  }

  ngOnInit(): void {
    this.getParams();
    this.getTestTypes();
    this.getTest();
  }

  getParams() {
    this._route.params.subscribe(
      params => {
        this.id = params.id
      }
    );
  }

  getTest() {
    this._testService.getTest(this.id).subscribe(
      res => {
        if (res.test){
          this.test = res.test;
          this.test.testTypeID = res.test.testTypeID._id;
        }
      },
      err => {
        alert(err.error.message);
      }
    );
  }

  async onSubmit() {
    if (await this._refreshService.onAction()) {
      this.updateMyTest();
    }
  }

  updateMyTest() {
    if (this.updateTest$ == null) this.updateTest$ = this._testService.updateMyTest(this.test).pipe(shareReplay(1));
    this.updateTest$.subscribe(
      res => {
        this.updateTest$ = null;
        if (res.test) {
          if (this.fileToUpload != null) {
            setTimeout(() => {
              this.uploadFile(res.test._id);  
            }, 0);
            return;
          }
          Swal.fire({
            title: 'Exito al actualizar',
            icon: 'success',
            text: 'El examen se actualizo correctamente.',
            background: 'rgba(0, 0, 0, 1)'
          }).then(()=>{
            this.router.navigate(['/mis-examenes']);
          });
        }
      },
      err => {
        this.updateTest$ = null;
        Swal.fire({
          title: 'Error al actualizar',
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
            title: 'Exito al actualizar',
            icon: 'success',
            text: 'El examen se actualizo correctamente.',
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
    );
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