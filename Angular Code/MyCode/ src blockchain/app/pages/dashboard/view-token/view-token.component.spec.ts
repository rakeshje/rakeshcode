import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTokenComponent } from './view-token.component';

describe('ViewTokenComponent', () => {
  let component: ViewTokenComponent;
  let fixture: ComponentFixture<ViewTokenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewTokenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
