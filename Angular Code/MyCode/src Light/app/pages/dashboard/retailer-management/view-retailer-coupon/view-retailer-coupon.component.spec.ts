import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRetailerCouponComponent } from './view-retailer-coupon.component';

describe('ViewRetailerCouponComponent', () => {
  let component: ViewRetailerCouponComponent;
  let fixture: ComponentFixture<ViewRetailerCouponComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewRetailerCouponComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewRetailerCouponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
