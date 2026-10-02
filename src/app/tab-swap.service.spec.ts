import { TestBed } from '@angular/core/testing';

import { TabSwapService } from './tab-swap.service';

describe('TabSwapService', () => {
  let service: TabSwapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TabSwapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
