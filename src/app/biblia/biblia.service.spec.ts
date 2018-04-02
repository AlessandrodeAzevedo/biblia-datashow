import { TestBed, inject } from '@angular/core/testing';

import { BibliaService } from './biblia.service';

describe('BibliaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BibliaService]
    });
  });

  it('should be created', inject([BibliaService], (service: BibliaService) => {
    expect(service).toBeTruthy();
  }));
});
