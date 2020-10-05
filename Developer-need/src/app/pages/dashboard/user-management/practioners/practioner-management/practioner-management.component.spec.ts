import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PractionerManagementComponent } from './practioner-management.component';

describe('PractionerManagementComponent', () => {
  let component: PractionerManagementComponent;
  let fixture: ComponentFixture<PractionerManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PractionerManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PractionerManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
