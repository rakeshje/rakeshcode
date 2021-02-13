import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSubscriptionComponent } from './view-subscription.component';

describe('ViewSubscriptionComponent', () => {
  let component: ViewSubscriptionComponent;
  let fixture: ComponentFixture<ViewSubscriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSubscriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
