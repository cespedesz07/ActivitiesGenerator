import { TestBed, inject } from '@angular/core/testing';

import { ActivityGenerationService } from './activity-generation.service';

describe('ActivityGenerationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActivityGenerationService]
    });
  });

  it('should be created', inject([ActivityGenerationService], (service: ActivityGenerationService) => {
    expect(service).toBeTruthy();
  }));
});
