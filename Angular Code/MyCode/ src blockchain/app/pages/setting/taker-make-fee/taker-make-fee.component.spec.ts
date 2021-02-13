import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TakerMakeFeeComponent } from './taker-make-fee.component';

describe('TakerMakeFeeComponent', () => {
  let component: TakerMakeFeeComponent;
  let fixture: ComponentFixture<TakerMakeFeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TakerMakeFeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TakerMakeFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
