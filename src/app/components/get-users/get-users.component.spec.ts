import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GetUsersComponent } from './get-users.component';

describe('GetUsersComponent', () => {
  let component: GetUsersComponent;
  let fixture: ComponentFixture<GetUsersComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GetUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
