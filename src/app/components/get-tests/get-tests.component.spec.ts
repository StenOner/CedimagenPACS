import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetTestsComponent } from './get-tests.component';

describe('GetTestsComponent', () => {
  let component: GetTestsComponent;
  let fixture: ComponentFixture<GetTestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetTestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetTestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
