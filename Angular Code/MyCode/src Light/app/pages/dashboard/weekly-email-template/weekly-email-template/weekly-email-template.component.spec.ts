import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyEmailTemplateComponent } from './weekly-email-template.component';

describe('WeeklyEmailTemplateComponent', () => {
  let component: WeeklyEmailTemplateComponent;
  let fixture: ComponentFixture<WeeklyEmailTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeeklyEmailTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeeklyEmailTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
