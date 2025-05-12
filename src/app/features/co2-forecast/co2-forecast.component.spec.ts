import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Co2ForecastComponent } from './co2-forecast.component';

describe('Co2ForecastComponent', () => {
  let component: Co2ForecastComponent;
  let fixture: ComponentFixture<Co2ForecastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Co2ForecastComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Co2ForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
