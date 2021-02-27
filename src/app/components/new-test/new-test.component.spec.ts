import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NewTestComponent } from './new-test.component';

describe('NewTestComponent', () => {
  let component: NewTestComponent;
  let fixture: ComponentFixture<NewTestComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NewTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
