import { TestBed } from '@angular/core/testing';

import { SafeCookieService } from './safe-cookie.service';

describe('SafeCookieService', () => {
  let service: SafeCookieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SafeCookieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
