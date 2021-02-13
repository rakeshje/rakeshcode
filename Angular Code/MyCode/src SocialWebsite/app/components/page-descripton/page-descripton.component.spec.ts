import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageDescriptonComponent } from './page-descripton.component';

describe('PageDescriptonComponent', () => {
  let component: PageDescriptonComponent;
  let fixture: ComponentFixture<PageDescriptonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageDescriptonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageDescriptonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
