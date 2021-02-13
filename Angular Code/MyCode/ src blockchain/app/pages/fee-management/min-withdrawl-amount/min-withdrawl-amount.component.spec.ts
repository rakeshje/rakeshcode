import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinWithdrawlAmountComponent } from './min-withdrawl-amount.component';

describe('MinWithdrawlAmountComponent', () => {
  let component: MinWithdrawlAmountComponent;
  let fixture: ComponentFixture<MinWithdrawlAmountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinWithdrawlAmountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinWithdrawlAmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
