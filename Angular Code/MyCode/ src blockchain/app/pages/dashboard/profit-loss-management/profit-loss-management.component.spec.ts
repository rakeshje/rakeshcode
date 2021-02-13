import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfitLossManagementComponent } from './profit-loss-management.component';

describe('ProfitLossManagementComponent', () => {
  let component: ProfitLossManagementComponent;
  let fixture: ComponentFixture<ProfitLossManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfitLossManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfitLossManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
