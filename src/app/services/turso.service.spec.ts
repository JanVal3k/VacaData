import { TestBed } from '@angular/core/testing';

import { TursoService } from './turso.service';

describe('TursoService', () => {
  let service: TursoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TursoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
