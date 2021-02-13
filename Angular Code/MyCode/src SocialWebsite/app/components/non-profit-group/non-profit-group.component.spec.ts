import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonProfitGroupComponent } from './non-profit-group.component';

describe('NonProfitGroupComponent', () => {
  let component: NonProfitGroupComponent;
  let fixture: ComponentFixture<NonProfitGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NonProfitGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonProfitGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
