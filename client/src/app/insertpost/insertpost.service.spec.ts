import { TestBed, inject } from '@angular/core/testing';

import { InsertpostService } from './insertpost.service';

describe('InsertpostService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InsertpostService]
    });
  });

  it('should be created', inject([InsertpostService], (service: InsertpostService) => {
    expect(service).toBeTruthy();
  }));
});
