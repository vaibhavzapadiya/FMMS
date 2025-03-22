import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignWorkVendorComponent } from './assign-work-vendor.component';

describe('AssignWorkVendorComponent', () => {
  let component: AssignWorkVendorComponent;
  let fixture: ComponentFixture<AssignWorkVendorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignWorkVendorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignWorkVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
