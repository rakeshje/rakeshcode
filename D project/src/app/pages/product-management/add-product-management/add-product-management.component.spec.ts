import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductManagementComponent } from './add-product-management.component';

describe('AddProductManagementComponent', () => {
  let component: AddProductManagementComponent;
  let fixture: ComponentFixture<AddProductManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProductManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProductManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
