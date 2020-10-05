import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPractionerComponent } from './add-practioner.component';

describe('AddPractionerComponent', () => {
  let component: AddPractionerComponent;
  let fixture: ComponentFixture<AddPractionerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPractionerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPractionerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
