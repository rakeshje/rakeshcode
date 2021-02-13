import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStaticPageComponent } from './view-static-page.component';

describe('ViewStaticPageComponent', () => {
  let component: ViewStaticPageComponent;
  let fixture: ComponentFixture<ViewStaticPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewStaticPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewStaticPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
