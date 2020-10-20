import { TestBed } from '@angular/core/testing';

import { RefreshTokenOnActionService } from './refresh-token-on-action.service';

describe('RefreshTokenOnActionService', () => {
  let service: RefreshTokenOnActionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RefreshTokenOnActionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
