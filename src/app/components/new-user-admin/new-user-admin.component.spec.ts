import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NewUserAdminComponent } from './new-user-admin.component';

describe('NewUserAdminComponent', () => {
  let component: NewUserAdminComponent;
  let fixture: ComponentFixture<NewUserAdminComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NewUserAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewUserAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
