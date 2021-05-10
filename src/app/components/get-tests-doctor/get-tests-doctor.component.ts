import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Environment } from 'src/app/environment/environment';
import { Test } from 'src/app/models/test';
import { DecypherTokenService } from 'src/app/services/decypher-token.service';
import { RefreshTokenOnActionService } from 'src/app/services/refresh-token-on-action.service';
import { TestService } from 'src/app/services/test.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-get-tests-doctor',
  templateUrl: './get-tests-doctor.component.html',
  styleUrls: ['./get-tests-doctor.component.scss'],
  providers: [TestService, DecypherTokenService, RefreshTokenOnActionService]
})
export class GetTestsDoctorComponent implements OnDestroy, OnInit {
  public url: string;
  public userID: string;
  public tests: Test[];
  public dtOptions: DataTables.Settings;
  public dtTrigger: Subject<any>;

  constructor(
    private _testService: TestService,
    private _decypherTokenService: DecypherTokenService,
    private _refreshTokenService: RefreshTokenOnActionService,
    private router: Router
  ) {
    this.url = Environment.url;
    this.userID = '';
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
    this.getUserID();
    this.getTests();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
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

  async openReview(id: string) {
    Swal.fire({
      title: 'Revisar examen?',
      icon: 'info',
      text: 'Esta accion ligara el examen a usted.',
      background: 'rgba(0, 0, 0, 1)',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Revisar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (!result.isConfirmed) return;
      if (await this._refreshTokenService.onAction()) {
        this._testService.openReview(id).subscribe(
          res => {
            if (res.message) {
              this.router.navigate(['/revisar-examen', id])
            }
          },
          err => {
            Swal.fire({
              title: 'Error al abrir revision de examen',
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