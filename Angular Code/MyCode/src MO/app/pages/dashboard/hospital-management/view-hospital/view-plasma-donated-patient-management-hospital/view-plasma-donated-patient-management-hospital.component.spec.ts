import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPlasmaDonatedPatientManagementHospitalComponent } from './view-plasma-donated-patient-management-hospital.component';

describe('ViewPlasmaDonatedPatientManagementHospitalComponent', () => {
  let component: ViewPlasmaDonatedPatientManagementHospitalComponent;
  let fixture: ComponentFixture<ViewPlasmaDonatedPatientManagementHospitalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPlasmaDonatedPatientManagementHospitalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPlasmaDonatedPatientManagementHospitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
