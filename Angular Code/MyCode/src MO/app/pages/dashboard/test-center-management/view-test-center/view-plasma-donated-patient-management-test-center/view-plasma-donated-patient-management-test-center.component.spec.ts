import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPlasmaDonatedPatientManagementTestCenterComponent } from './view-plasma-donated-patient-management-test-center.component';

describe('ViewPlasmaDonatedPatientManagementTestCenterComponent', () => {
  let component: ViewPlasmaDonatedPatientManagementTestCenterComponent;
  let fixture: ComponentFixture<ViewPlasmaDonatedPatientManagementTestCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPlasmaDonatedPatientManagementTestCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPlasmaDonatedPatientManagementTestCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
