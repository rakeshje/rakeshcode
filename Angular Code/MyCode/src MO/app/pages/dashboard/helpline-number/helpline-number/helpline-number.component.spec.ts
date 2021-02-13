import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelplineNumberComponent } from './helpline-number.component';

describe('HelplineNumberComponent', () => {
  let component: HelplineNumberComponent;
  let fixture: ComponentFixture<HelplineNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelplineNumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelplineNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
