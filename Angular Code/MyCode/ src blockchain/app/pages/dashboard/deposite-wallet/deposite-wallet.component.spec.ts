import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositeWalletComponent } from './deposite-wallet.component';

describe('DepositeWalletComponent', () => {
  let component: DepositeWalletComponent;
  let fixture: ComponentFixture<DepositeWalletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepositeWalletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositeWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
