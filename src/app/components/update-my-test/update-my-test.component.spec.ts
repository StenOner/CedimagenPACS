import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UpdateMyTestComponent } from './update-my-test.component';

describe('UpdateMyTestComponent', () => {
  let component: UpdateMyTestComponent;
  let fixture: ComponentFixture<UpdateMyTestComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateMyTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateMyTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
