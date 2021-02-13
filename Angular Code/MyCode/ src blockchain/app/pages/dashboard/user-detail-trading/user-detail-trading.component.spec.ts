import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailTradingComponent } from './user-detail-trading.component';

describe('UserDetailTradingComponent', () => {
  let component: UserDetailTradingComponent;
  let fixture: ComponentFixture<UserDetailTradingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDetailTradingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailTradingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
