import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManagementAdminComponent } from './user-management-admin.component';

describe('UserManagementAdminComponent', () => {
  let component: UserManagementAdminComponent;
  let fixture: ComponentFixture<UserManagementAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserManagementAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserManagementAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
