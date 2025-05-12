import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Co2EmissionsComponent } from './co2-emissions.component';

describe('Co2EmissionsComponent', () => {
  let component: Co2EmissionsComponent;
  let fixture: ComponentFixture<Co2EmissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Co2EmissionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Co2EmissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
