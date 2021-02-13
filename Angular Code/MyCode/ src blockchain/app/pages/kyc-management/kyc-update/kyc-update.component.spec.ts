import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KycUpdateComponent } from './kyc-update.component';

describe('KycUpdateComponent', () => {
  let component: KycUpdateComponent;
  let fixture: ComponentFixture<KycUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KycUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KycUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
