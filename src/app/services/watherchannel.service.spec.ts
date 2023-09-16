import { TestBed } from '@angular/core/testing';

import { WatherchannelService } from './watherchannel.service';

describe('WatherchannelService', () => {
  let service: WatherchannelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WatherchannelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
