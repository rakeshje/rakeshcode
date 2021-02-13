import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotWalletManagementComponent } from './hot-wallet-management.component';

describe('HotWalletManagementComponent', () => {
  let component: HotWalletManagementComponent;
  let fixture: ComponentFixture<HotWalletManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotWalletManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotWalletManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
