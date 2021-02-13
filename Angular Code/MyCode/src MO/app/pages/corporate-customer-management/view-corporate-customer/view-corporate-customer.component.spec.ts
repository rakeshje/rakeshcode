import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCorporateCustomerComponent } from './view-corporate-customer.component';

describe('ViewCorporateCustomerComponent', () => {
  let component: ViewCorporateCustomerComponent;
  let fixture: ComponentFixture<ViewCorporateCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCorporateCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCorporateCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
