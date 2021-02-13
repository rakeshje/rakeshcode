import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDiscussionForumComponent } from './view-discussion-forum.component';

describe('ViewDiscussionForumComponent', () => {
  let component: ViewDiscussionForumComponent;
  let fixture: ComponentFixture<ViewDiscussionForumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewDiscussionForumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDiscussionForumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
