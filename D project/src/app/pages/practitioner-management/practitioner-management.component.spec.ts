import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PractitionerManagementComponent } from './practitioner-management.component';

describe('PractitionerManagementComponent', () => {
  let component: PractitionerManagementComponent;
  let fixture: ComponentFixture<PractitionerManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PractitionerManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PractitionerManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
