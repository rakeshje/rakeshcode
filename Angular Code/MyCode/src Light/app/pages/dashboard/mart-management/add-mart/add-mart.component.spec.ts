import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMartComponent } from './add-mart.component';

describe('AddMartComponent', () => {
  let component: AddMartComponent;
  let fixture: ComponentFixture<AddMartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
