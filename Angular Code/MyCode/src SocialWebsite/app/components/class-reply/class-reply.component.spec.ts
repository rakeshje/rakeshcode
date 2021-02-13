import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassReplyComponent } from './class-reply.component';

describe('ClassReplyComponent', () => {
  let component: ClassReplyComponent;
  let fixture: ComponentFixture<ClassReplyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassReplyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassReplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
