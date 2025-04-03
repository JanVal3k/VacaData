import { TestBed } from '@angular/core/testing';

import { BovinesService } from './bovines.service';

describe('BovinesService', () => {
  let service: BovinesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BovinesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
