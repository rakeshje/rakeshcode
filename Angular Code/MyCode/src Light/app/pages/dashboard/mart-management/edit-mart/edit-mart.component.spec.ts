import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMartComponent } from './edit-mart.component';

describe('EditMartComponent', () => {
  let component: EditMartComponent;
  let fixture: ComponentFixture<EditMartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
