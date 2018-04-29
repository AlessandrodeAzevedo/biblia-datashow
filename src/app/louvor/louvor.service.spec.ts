import { TestBed, inject } from '@angular/core/testing';

import { LouvorService } from './louvor.service';

describe('LouvorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LouvorService]
    });
  });

  it('should be created', inject([LouvorService], (service: LouvorService) => {
    expect(service).toBeTruthy();
  }));
});
