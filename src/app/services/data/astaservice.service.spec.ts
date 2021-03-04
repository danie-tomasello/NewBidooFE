import { TestBed } from '@angular/core/testing';

import { AstaserviceService } from './astaservice.service';

describe('AstaserviceService', () => {
  let service: AstaserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AstaserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
