import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLimitComponent } from './view-limit.component';

describe('ViewLimitComponent', () => {
  let component: ViewLimitComponent;
  let fixture: ComponentFixture<ViewLimitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewLimitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewLimitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
