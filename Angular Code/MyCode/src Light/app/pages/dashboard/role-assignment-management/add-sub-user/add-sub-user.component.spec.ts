import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubUserComponent } from './add-sub-user.component';

describe('AddSubUserComponent', () => {
  let component: AddSubUserComponent;
  let fixture: ComponentFixture<AddSubUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSubUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSubUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
