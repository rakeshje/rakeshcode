import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPractionerComponent } from './view-practioner.component';

describe('ViewPractionerComponent', () => {
  let component: ViewPractionerComponent;
  let fixture: ComponentFixture<ViewPractionerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPractionerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPractionerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
