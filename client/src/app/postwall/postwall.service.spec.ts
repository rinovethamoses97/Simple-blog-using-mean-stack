import { TestBed, inject } from '@angular/core/testing';

import { PostwallService } from './postwall.service';

describe('PostwallService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostwallService]
    });
  });

  it('should be created', inject([PostwallService], (service: PostwallService) => {
    expect(service).toBeTruthy();
  }));
});
