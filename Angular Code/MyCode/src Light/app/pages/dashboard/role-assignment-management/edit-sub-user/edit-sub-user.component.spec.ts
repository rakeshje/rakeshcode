import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSubUserComponent } from './edit-sub-user.component';

describe('EditSubUserComponent', () => {
  let component: EditSubUserComponent;
  let fixture: ComponentFixture<EditSubUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSubUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSubUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
