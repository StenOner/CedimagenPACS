import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ReviewTestComponent } from './review-test.component';

describe('ReviewTestComponent', () => {
  let component: ReviewTestComponent;
  let fixture: ComponentFixture<ReviewTestComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
