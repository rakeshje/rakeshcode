import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductBiddingComponent } from './add-product-bidding.component';

describe('AddProductBiddingComponent', () => {
  let component: AddProductBiddingComponent;
  let fixture: ComponentFixture<AddProductBiddingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProductBiddingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProductBiddingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
