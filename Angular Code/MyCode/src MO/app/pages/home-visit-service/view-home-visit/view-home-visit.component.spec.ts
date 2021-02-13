import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewHomeVisitComponent } from './view-home-visit.component';

describe('ViewHomeVisitComponent', () => {
  let component: ViewHomeVisitComponent;
  let fixture: ComponentFixture<ViewHomeVisitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewHomeVisitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewHomeVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
