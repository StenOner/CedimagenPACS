import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetTestsDoctorComponent } from './get-tests-doctor.component';

describe('GetTestsDoctorComponent', () => {
  let component: GetTestsDoctorComponent;
  let fixture: ComponentFixture<GetTestsDoctorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetTestsDoctorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetTestsDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
