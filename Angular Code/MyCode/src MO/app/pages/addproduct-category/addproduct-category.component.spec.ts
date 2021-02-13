import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddproductCategoryComponent } from './addproduct-category.component';

describe('AddproductCategoryComponent', () => {
  let component: AddproductCategoryComponent;
  let fixture: ComponentFixture<AddproductCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddproductCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddproductCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
