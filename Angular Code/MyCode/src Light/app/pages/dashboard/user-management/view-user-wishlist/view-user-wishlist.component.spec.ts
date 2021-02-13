import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUserWishlistComponent } from './view-user-wishlist.component';

describe('ViewUserWishlistComponent', () => {
  let component: ViewUserWishlistComponent;
  let fixture: ComponentFixture<ViewUserWishlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewUserWishlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewUserWishlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
