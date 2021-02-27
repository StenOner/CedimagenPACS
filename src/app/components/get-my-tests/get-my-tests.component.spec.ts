import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GetMyTestsComponent } from './get-my-tests.component';

describe('GetMyTestsComponent', () => {
  let component: GetMyTestsComponent;
  let fixture: ComponentFixture<GetMyTestsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GetMyTestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetMyTestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
