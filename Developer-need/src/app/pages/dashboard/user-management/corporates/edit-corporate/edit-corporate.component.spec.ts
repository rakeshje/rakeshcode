import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCorporateComponent } from './edit-corporate.component';

describe('EditCorporateComponent', () => {
  let component: EditCorporateComponent;
  let fixture: ComponentFixture<EditCorporateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCorporateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCorporateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
