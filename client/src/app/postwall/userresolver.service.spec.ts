import { TestBed, inject } from '@angular/core/testing';

import { UserresolverService } from './userresolver.service';

describe('UserresolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserresolverService]
    });
  });

  it('should be created', inject([UserresolverService], (service: UserresolverService) => {
    expect(service).toBeTruthy();
  }));
});
