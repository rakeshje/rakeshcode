import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityProfileComponent } from './activity-profile.component';

describe('ActivityProfileComponent', () => {
  let component: ActivityProfileComponent;
  let fixture: ComponentFixture<ActivityProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
