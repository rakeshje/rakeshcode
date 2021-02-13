import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupReplyComponent } from './group-reply.component';

describe('GroupReplyComponent', () => {
  let component: GroupReplyComponent;
  let fixture: ComponentFixture<GroupReplyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupReplyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupReplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
