import { TestBed, inject } from '@angular/core/testing';

import { StandbyService } from './standby.service';

describe('StandbyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StandbyService]
    });
  });

  it('should be created', inject([StandbyService], (service: StandbyService) => {
    expect(service).toBeTruthy();
  }));
});
