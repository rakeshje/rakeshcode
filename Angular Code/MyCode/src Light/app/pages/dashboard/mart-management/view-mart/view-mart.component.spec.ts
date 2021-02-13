import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMartComponent } from './view-mart.component';

describe('ViewMartComponent', () => {
  let component: ViewMartComponent;
  let fixture: ComponentFixture<ViewMartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewMartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
