import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewHelpCenterComponent } from './view-help-center.component';

describe('ViewHelpCenterComponent', () => {
  let component: ViewHelpCenterComponent;
  let fixture: ComponentFixture<ViewHelpCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewHelpCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewHelpCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
