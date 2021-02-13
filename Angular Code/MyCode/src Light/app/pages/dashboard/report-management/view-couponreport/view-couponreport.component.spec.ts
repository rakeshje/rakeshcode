import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCouponreportComponent } from './view-couponreport.component';

describe('ViewCouponreportComponent', () => {
  let component: ViewCouponreportComponent;
  let fixture: ComponentFixture<ViewCouponreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCouponreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCouponreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
