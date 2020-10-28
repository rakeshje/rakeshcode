import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateCustomerManagementComponent } from './corporate-customer-management.component';

describe('CorporateCustomerManagementComponent', () => {
  let component: CorporateCustomerManagementComponent;
  let fixture: ComponentFixture<CorporateCustomerManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateCustomerManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateCustomerManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
