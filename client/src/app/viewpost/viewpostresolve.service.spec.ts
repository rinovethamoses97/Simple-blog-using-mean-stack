import { TestBed, inject } from '@angular/core/testing';

import { ViewpostresolveService } from './viewpostresolve.service';

describe('ViewpostresolveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ViewpostresolveService]
    });
  });

  it('should be created', inject([ViewpostresolveService], (service: ViewpostresolveService) => {
    expect(service).toBeTruthy();
  }));
});
