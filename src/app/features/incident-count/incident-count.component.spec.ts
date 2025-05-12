import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentCountComponent } from './incident-count.component';

describe('IncidentCountComponent', () => {
  let component: IncidentCountComponent;
  let fixture: ComponentFixture<IncidentCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncidentCountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncidentCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
