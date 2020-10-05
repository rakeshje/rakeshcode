import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPractionerComponent } from './edit-practioner.component';

describe('EditPractionerComponent', () => {
  let component: EditPractionerComponent;
  let fixture: ComponentFixture<EditPractionerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPractionerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPractionerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
