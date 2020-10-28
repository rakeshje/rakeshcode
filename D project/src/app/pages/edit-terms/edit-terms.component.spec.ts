import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTermsComponent } from './edit-terms.component';

describe('EditTermsComponent', () => {
  let component: EditTermsComponent;
  let fixture: ComponentFixture<EditTermsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTermsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
