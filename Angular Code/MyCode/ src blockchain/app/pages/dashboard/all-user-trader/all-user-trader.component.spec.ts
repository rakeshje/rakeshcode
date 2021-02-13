import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllUserTraderComponent } from './all-user-trader.component';

describe('AllUserTraderComponent', () => {
  let component: AllUserTraderComponent;
  let fixture: ComponentFixture<AllUserTraderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllUserTraderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllUserTraderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
