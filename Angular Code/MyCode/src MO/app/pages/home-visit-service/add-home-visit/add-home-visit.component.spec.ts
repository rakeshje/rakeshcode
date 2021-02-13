import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHomeVisitComponent } from './add-home-visit.component';

describe('AddHomeVisitComponent', () => {
  let component: AddHomeVisitComponent;
  let fixture: ComponentFixture<AddHomeVisitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddHomeVisitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHomeVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
