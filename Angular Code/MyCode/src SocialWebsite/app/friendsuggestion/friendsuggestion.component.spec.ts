import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsuggestionComponent } from './friendsuggestion.component';

describe('FriendsuggestionComponent', () => {
  let component: FriendsuggestionComponent;
  let fixture: ComponentFixture<FriendsuggestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendsuggestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendsuggestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
