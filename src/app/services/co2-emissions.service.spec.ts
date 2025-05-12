import { TestBed } from '@angular/core/testing';

import { Co2EmissionsService } from './co2-emissions.service';

describe('Co2EmissionsService', () => {
  let service: Co2EmissionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Co2EmissionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
