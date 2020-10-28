import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftCardManagementComponent } from './gift-card-management.component';

describe('GiftCardManagementComponent', () => {
  let component: GiftCardManagementComponent;
  let fixture: ComponentFixture<GiftCardManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GiftCardManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiftCardManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
