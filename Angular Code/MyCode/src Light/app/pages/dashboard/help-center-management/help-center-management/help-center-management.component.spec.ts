import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpCenterManagementComponent } from './help-center-management.component';

describe('HelpCenterManagementComponent', () => {
  let component: HelpCenterManagementComponent;
  let fixture: ComponentFixture<HelpCenterManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpCenterManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpCenterManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
