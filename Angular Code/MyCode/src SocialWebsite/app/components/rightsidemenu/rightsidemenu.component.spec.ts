import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RightsidemenuComponent } from './rightsidemenu.component';

describe('RightsidemenuComponent', () => {
  let component: RightsidemenuComponent;
  let fixture: ComponentFixture<RightsidemenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RightsidemenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RightsidemenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
