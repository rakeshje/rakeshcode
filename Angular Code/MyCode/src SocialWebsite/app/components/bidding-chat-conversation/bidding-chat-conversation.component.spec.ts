import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BiddingChatConversationComponent } from './bidding-chat-conversation.component';

describe('BiddingChatConversationComponent', () => {
  let component: BiddingChatConversationComponent;
  let fixture: ComponentFixture<BiddingChatConversationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BiddingChatConversationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiddingChatConversationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
