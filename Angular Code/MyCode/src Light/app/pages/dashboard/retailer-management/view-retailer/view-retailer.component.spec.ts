import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRetailerComponent } from './view-retailer.component';

describe('ViewRetailerComponent', () => {
  let component: ViewRetailerComponent;
  let fixture: ComponentFixture<ViewRetailerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewRetailerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewRetailerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
