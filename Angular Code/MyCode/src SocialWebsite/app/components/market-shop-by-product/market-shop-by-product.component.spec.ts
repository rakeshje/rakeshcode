import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketShopByProductComponent } from './market-shop-by-product.component';

describe('MarketShopByProductComponent', () => {
  let component: MarketShopByProductComponent;
  let fixture: ComponentFixture<MarketShopByProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketShopByProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketShopByProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
