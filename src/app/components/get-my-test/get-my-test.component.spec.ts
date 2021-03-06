import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GetMyTestComponent } from './get-my-test.component';

describe('GetMyTestComponent', () => {
  let component: GetMyTestComponent;
  let fixture: ComponentFixture<GetMyTestComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GetMyTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetMyTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
