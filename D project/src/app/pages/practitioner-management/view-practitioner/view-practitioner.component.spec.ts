import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPractitionerComponent } from './view-practitioner.component';

describe('ViewPractitionerComponent', () => {
  let component: ViewPractitionerComponent;
  let fixture: ComponentFixture<ViewPractitionerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPractitionerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPractitionerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
