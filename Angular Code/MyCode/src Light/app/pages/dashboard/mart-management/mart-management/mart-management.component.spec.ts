import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MartManagementComponent } from './mart-management.component';

describe('MartManagementComponent', () => {
  let component: MartManagementComponent;
  let fixture: ComponentFixture<MartManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MartManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MartManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
