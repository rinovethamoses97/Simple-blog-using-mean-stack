import { TestBed, inject } from '@angular/core/testing';

import { UserpostresolverService } from './userpostresolver.service';

describe('UserpostresolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserpostresolverService]
    });
  });

  it('should be created', inject([UserpostresolverService], (service: UserpostresolverService) => {
    expect(service).toBeTruthy();
  }));
});
