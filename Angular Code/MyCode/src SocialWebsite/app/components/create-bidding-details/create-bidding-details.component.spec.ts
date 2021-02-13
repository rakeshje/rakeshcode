import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBiddingDetailsComponent } from './create-bidding-details.component';

describe('CreateBiddingDetailsComponent', () => {
  let component: CreateBiddingDetailsComponent;
  let fixture: ComponentFixture<CreateBiddingDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateBiddingDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBiddingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
