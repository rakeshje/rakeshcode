import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdministerComponent } from './add-administer.component';

describe('AddAdministerComponent', () => {
  let component: AddAdministerComponent;
  let fixture: ComponentFixture<AddAdministerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAdministerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAdministerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
