import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHomeVisitComponent } from './edit-home-visit.component';

describe('EditHomeVisitComponent', () => {
  let component: EditHomeVisitComponent;
  let fixture: ComponentFixture<EditHomeVisitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditHomeVisitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditHomeVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
