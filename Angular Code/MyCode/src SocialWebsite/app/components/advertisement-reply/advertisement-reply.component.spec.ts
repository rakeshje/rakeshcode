import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertisementReplyComponent } from './advertisement-reply.component';

describe('AdvertisementReplyComponent', () => {
  let component: AdvertisementReplyComponent;
  let fixture: ComponentFixture<AdvertisementReplyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvertisementReplyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertisementReplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
