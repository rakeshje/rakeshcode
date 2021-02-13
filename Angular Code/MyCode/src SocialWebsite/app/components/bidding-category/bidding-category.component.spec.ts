import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BiddingCategoryComponent } from './bidding-category.component';

describe('BiddingCategoryComponent', () => {
  let component: BiddingCategoryComponent;
  let fixture: ComponentFixture<BiddingCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BiddingCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiddingCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
