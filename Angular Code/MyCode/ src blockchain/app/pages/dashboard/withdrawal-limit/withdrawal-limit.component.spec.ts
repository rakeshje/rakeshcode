import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawalLimitComponent } from './withdrawal-limit.component';

describe('WithdrawalLimitComponent', () => {
  let component: WithdrawalLimitComponent;
  let fixture: ComponentFixture<WithdrawalLimitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WithdrawalLimitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WithdrawalLimitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
