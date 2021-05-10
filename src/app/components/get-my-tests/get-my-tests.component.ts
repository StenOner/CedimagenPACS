import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Environment } from 'src/app/environment/environment';
import { Test } from 'src/app/models/test';
import { DecypherTokenService } from 'src/app/services/decypher-token.service';
import { RefreshTokenOnActionService } from 'src/app/services/refresh-token-on-action.service';
import { TestService } from 'src/app/services/test.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-get-my-tests',
  templateUrl: './get-my-tests.component.html',
  styleUrls: ['./get-my-tests.component.scss'],
  providers: [TestService, RefreshTokenOnActionService, DecypherTokenService]
})
export class GetMyTestsComponent implements OnDestroy, OnInit {
  public clientID: string;
  public url: string;
  public myTests: Test[];
  public dtOptions: DataTables.Settings;
  public dtTrigger: Subject<any>;

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
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 25,
      language: {
        url: '../../../assets/datatable/spanish.json'
      }
    };
    this.dtTrigger = new Subject<any>();
    this.getUserID();
    this.getMyTests();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  getMyTests() {
    this._testService.getMyTests(this.clientID).subscribe(
      res => {
        if (res.tests) {
          this.myTests = res.tests;
          this.dtTrigger.next();
        }
      },
      err => {
        Swal.fire({
          title: 'Error al obtener examenes',
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
    if (payload) this.clientID = payload._id;
  }

  async deleteMyTest(id: string) {
    Swal.fire({
      title: 'Eliminar examen?',
      icon: 'warning',
      text: 'Esta accion es irreversible.',
      background: 'rgba(0, 0, 0, 1)',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (!result.isConfirmed) return;
      if (await this._refreshTokenService.onAction()) {
        this._testService.deleteTest(id).subscribe(
          res => {
            if (res.test) {
              this.myTests = this.myTests.filter(
                test => test._id !== id
              );
              Swal.fire({
                title: 'Exito al eliminar',
                icon: 'success',
                text: 'El examen se elimino correctamente.',
                background: 'rgba(0, 0, 0, 1)'
              });
            }
          },
          err => {
            Swal.fire({
              title: 'Error al borrar examen',
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