import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewUserAdminComponent } from './new-user-admin.component';

describe('NewUserAdminComponent', () => {
  let component: NewUserAdminComponent;
  let fixture: ComponentFixture<NewUserAdminComponent>;

  beforeEach(async(() => {
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
