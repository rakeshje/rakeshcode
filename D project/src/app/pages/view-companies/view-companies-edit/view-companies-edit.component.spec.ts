import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCompaniesEditComponent } from './view-companies-edit.component';

describe('ViewCompaniesEditComponent', () => {
  let component: ViewCompaniesEditComponent;
  let fixture: ComponentFixture<ViewCompaniesEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCompaniesEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCompaniesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
