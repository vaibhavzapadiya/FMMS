import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryfromListComponent } from './inventoryfrom-list.component';

describe('InventoryfromListComponent', () => {
  let component: InventoryfromListComponent;
  let fixture: ComponentFixture<InventoryfromListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventoryfromListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryfromListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
