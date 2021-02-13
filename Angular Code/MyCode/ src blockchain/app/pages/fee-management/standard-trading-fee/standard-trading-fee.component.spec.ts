import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardTradingFeeComponent } from './standard-trading-fee.component';

describe('StandardTradingFeeComponent', () => {
  let component: StandardTradingFeeComponent;
  let fixture: ComponentFixture<StandardTradingFeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StandardTradingFeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StandardTradingFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
