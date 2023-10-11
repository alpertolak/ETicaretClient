import { TestBed } from '@angular/core/testing';

import { AdminAlertifyService } from './admin-alertify.service';

describe('AdminAlertifyService', () => {
  let service: AdminAlertifyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminAlertifyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
