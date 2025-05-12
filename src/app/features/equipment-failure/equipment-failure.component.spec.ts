import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentFailureComponent } from './equipment-failure.component';

describe('EquipmentFailureComponent', () => {
  let component: EquipmentFailureComponent;
  let fixture: ComponentFixture<EquipmentFailureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EquipmentFailureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipmentFailureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
