import { TestBed } from '@angular/core/testing';

import { DecypherTokenService } from './decypher-token.service';

describe('DecypherTokenService', () => {
  let service: DecypherTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DecypherTokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
