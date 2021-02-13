import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAdvertisementComponent } from './view-advertisement.component';

describe('ViewAdvertisementComponent', () => {
  let component: ViewAdvertisementComponent;
  let fixture: ComponentFixture<ViewAdvertisementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAdvertisementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAdvertisementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
