import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarDemoComponent } from './sidebar-demo.component';

describe('SidebarDemoComponent', () => {
  let component: SidebarDemoComponent;
  let fixture: ComponentFixture<SidebarDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
