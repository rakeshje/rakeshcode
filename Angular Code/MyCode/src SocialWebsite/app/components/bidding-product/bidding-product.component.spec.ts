import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BiddingProductComponent } from './bidding-product.component';

describe('BiddingProductComponent', () => {
  let component: BiddingProductComponent;
  let fixture: ComponentFixture<BiddingProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BiddingProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiddingProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
