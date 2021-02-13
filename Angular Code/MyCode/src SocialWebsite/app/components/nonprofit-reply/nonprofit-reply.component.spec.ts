import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonprofitReplyComponent } from './nonprofit-reply.component';

describe('NonprofitReplyComponent', () => {
  let component: NonprofitReplyComponent;
  let fixture: ComponentFixture<NonprofitReplyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NonprofitReplyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonprofitReplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
