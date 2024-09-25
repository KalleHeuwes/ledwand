import { TestBed } from '@angular/core/testing';

import { SpieltagsConfigService } from './spieltags-config.service';

describe('SpieltagsConfigService', () => {
  let service: SpieltagsConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpieltagsConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
