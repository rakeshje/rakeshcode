import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewHotColdWalletManagementComponent } from './view-hot-cold-wallet-management.component';

describe('ViewHotColdWalletManagementComponent', () => {
  let component: ViewHotColdWalletManagementComponent;
  let fixture: ComponentFixture<ViewHotColdWalletManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewHotColdWalletManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewHotColdWalletManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
