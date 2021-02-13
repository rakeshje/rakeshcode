import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTestCenterComponent } from './edit-test-center.component';

describe('EditTestCenterComponent', () => {
  let component: EditTestCenterComponent;
  let fixture: ComponentFixture<EditTestCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTestCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTestCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
