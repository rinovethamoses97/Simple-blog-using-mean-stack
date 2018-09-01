import { TestBed, inject } from '@angular/core/testing';

import { RegisteruserService } from './registeruser.service';

describe('RegisteruserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegisteruserService]
    });
  });

  it('should be created', inject([RegisteruserService], (service: RegisteruserService) => {
    expect(service).toBeTruthy();
  }));
});
