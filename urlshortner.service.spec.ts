import { TestBed } from '@angular/core/testing';

import { UrlshortnerService } from './urlshortner.service';

describe('UrlshortnerService', () => {
  let service: UrlshortnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UrlshortnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
