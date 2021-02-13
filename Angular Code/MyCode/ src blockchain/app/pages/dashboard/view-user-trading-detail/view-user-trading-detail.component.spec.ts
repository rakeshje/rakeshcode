import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUserTradingDetailComponent } from './view-user-trading-detail.component';

describe('ViewUserTradingDetailComponent', () => {
  let component: ViewUserTradingDetailComponent;
  let fixture: ComponentFixture<ViewUserTradingDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewUserTradingDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewUserTradingDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
