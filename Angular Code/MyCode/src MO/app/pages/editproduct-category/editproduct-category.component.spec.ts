import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditproductCategoryComponent } from './editproduct-category.component';

describe('EditproductCategoryComponent', () => {
  let component: EditproductCategoryComponent;
  let fixture: ComponentFixture<EditproductCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditproductCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditproductCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
