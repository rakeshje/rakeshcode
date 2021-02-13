import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginSessionActivityComponent } from './login-session-activity.component';

describe('LoginSessionActivityComponent', () => {
  let component: LoginSessionActivityComponent;
  let fixture: ComponentFixture<LoginSessionActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginSessionActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginSessionActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
