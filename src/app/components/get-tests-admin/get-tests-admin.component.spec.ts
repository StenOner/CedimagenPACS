import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetTestsAdminComponent } from './get-tests-admin.component';

describe('GetTestsAdminComponent', () => {
  let component: GetTestsAdminComponent;
  let fixture: ComponentFixture<GetTestsAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetTestsAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetTestsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
