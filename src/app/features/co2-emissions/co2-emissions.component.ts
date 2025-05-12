import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Add this import
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-co2-emissions',
  standalone: true,
  imports: [
    CommonModule, // Add CommonModule
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './co2-emissions.component.html',
  styleUrl: './co2-emissions.component.scss',
})
export class Co2EmissionsComponent implements OnInit {
  co2Form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.co2Form = this.fb.group({
      energyConsumption: ['', [Validators.required, Validators.min(0)]],
      productionRate: ['', [Validators.required, Validators.min(0)]],
      machineEfficiency: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      fuelType: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.co2Form.valid) {
      console.log('CO2 Emissions Form Submitted:', this.co2Form.value);
    }
  }
}