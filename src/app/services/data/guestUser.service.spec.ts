import { TestBed } from '@angular/core/testing';

import { GuestUserService } from './guestUser.service';

describe('UserServiceService', () => {
  let service: GuestUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuestUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
