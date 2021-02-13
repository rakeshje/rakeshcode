import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// import { ActiveInactiveManagementComponent } from './active-inactive-management.component';
import {ActiveInactiveManagementComponent} from './active-inactive-management.component'

describe('ActiveInactiveManagementComponent', () => {
  let component: ActiveInactiveManagementComponent;
  let fixture: ComponentFixture<ActiveInactiveManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveInactiveManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveInactiveManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
