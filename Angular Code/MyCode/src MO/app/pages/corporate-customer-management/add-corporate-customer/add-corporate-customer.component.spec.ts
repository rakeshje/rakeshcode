import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCorporateCustomerComponent } from './add-corporate-customer.component';

describe('AddCorporateCustomerComponent', () => {
  let component: AddCorporateCustomerComponent;
  let fixture: ComponentFixture<AddCorporateCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCorporateCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCorporateCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
