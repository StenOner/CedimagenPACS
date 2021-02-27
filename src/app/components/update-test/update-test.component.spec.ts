import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UpdateTestComponent } from './update-test.component';

describe('UpdateTestComponent', () => {
  let component: UpdateTestComponent;
  let fixture: ComponentFixture<UpdateTestComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
