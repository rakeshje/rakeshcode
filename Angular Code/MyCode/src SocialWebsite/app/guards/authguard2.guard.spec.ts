import { TestBed, async, inject } from '@angular/core/testing';

import { Authguard2Guard } from './authguard2.guard';

describe('Authguard2Guard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Authguard2Guard]
    });
  });

  it('should ...', inject([Authguard2Guard], (guard: Authguard2Guard) => {
    expect(guard).toBeTruthy();
  }));
});
