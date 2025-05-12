import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResolutionTimeComponent } from './resolution-time.component';

describe('ResolutionTimeComponent', () => {
  let component: ResolutionTimeComponent;
  let fixture: ComponentFixture<ResolutionTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResolutionTimeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResolutionTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
