import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEnduserComponent } from './view-enduser.component';

describe('ViewEnduserComponent', () => {
  let component: ViewEnduserComponent;
  let fixture: ComponentFixture<ViewEnduserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewEnduserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEnduserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
