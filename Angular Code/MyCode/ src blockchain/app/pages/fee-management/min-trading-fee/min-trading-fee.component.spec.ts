import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinTradingFeeComponent } from './min-trading-fee.component';

describe('MinTradingFeeComponent', () => {
  let component: MinTradingFeeComponent;
  let fixture: ComponentFixture<MinTradingFeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinTradingFeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinTradingFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
