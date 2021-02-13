import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDiscussionReplyComponent } from './view-discussion-reply.component';

describe('ViewDiscussionReplyComponent', () => {
  let component: ViewDiscussionReplyComponent;
  let fixture: ComponentFixture<ViewDiscussionReplyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewDiscussionReplyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDiscussionReplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
