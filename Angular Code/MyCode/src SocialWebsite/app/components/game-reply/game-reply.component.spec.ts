import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameReplyComponent } from './game-reply.component';

describe('GameReplyComponent', () => {
  let component: GameReplyComponent;
  let fixture: ComponentFixture<GameReplyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameReplyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameReplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
