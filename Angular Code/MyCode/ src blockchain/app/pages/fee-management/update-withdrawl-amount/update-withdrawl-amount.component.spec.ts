import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateWithdrawlAmountComponent } from './update-withdrawl-amount.component';

describe('UpdateWithdrawlAmountComponent', () => {
  let component: UpdateWithdrawlAmountComponent;
  let fixture: ComponentFixture<UpdateWithdrawlAmountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateWithdrawlAmountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateWithdrawlAmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
