import { TestBed, inject } from '@angular/core/testing';

import { LecturesService } from './lectures.service';

describe('LecturesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LecturesService]
    });
  });

  it('should be created', inject([LecturesService], (service: LecturesService) => {
    expect(service).toBeTruthy();
  }));
});
