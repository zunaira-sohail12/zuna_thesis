import { TestBed } from '@angular/core/testing';

import { PythonApisService } from './python-apis.service';

describe('PythonApisService', () => {
  let service: PythonApisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PythonApisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
