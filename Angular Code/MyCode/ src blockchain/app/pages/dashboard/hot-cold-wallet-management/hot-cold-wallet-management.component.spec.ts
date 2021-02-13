import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotColdWalletManagementComponent } from './hot-cold-wallet-management.component';

describe('HotColdWalletManagementComponent', () => {
  let component: HotColdWalletManagementComponent;
  let fixture: ComponentFixture<HotColdWalletManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotColdWalletManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotColdWalletManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
