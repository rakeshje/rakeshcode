import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleAssignmentManagementComponent } from './role-assignment-management.component';

describe('RoleAssignmentManagementComponent', () => {
  let component: RoleAssignmentManagementComponent;
  let fixture: ComponentFixture<RoleAssignmentManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleAssignmentManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleAssignmentManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
