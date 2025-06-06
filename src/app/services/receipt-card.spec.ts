import { TestBed } from '@angular/core/testing';

import { ReceiptCard } from './receipt-card';

describe('ReceiptCard', () => {
  let service: ReceiptCard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReceiptCard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
