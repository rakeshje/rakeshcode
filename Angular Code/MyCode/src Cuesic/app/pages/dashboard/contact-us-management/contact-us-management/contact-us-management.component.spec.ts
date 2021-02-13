import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactUsManagementComponent } from './contact-us-management.component';

describe('ContactUsManagementComponent', () => {
  let component: ContactUsManagementComponent;
  let fixture: ComponentFixture<ContactUsManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactUsManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactUsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
