import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GamingVideoComponent } from './gaming-video.component';

describe('GamingVideoComponent', () => {
  let component: GamingVideoComponent;
  let fixture: ComponentFixture<GamingVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GamingVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamingVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
