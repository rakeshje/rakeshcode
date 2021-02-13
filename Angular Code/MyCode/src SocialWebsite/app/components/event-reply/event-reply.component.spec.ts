import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventReplyComponent } from './event-reply.component';

describe('EventReplyComponent', () => {
  let component: EventReplyComponent;
  let fixture: ComponentFixture<EventReplyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventReplyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventReplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
