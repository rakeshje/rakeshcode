import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeVisitServiceComponent } from './home-visit-service.component';

describe('HomeVisitServiceComponent', () => {
  let component: HomeVisitServiceComponent;
  let fixture: ComponentFixture<HomeVisitServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeVisitServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeVisitServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
