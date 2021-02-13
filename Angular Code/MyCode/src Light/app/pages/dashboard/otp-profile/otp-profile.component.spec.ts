import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpProfileComponent } from './otp-profile.component';

describe('OtpProfileComponent', () => {
  let component: OtpProfileComponent;
  let fixture: ComponentFixture<OtpProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtpProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtpProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
