import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface PredictionPayload {
  date: string;
  total_emissions: number;
  [key: string]: any; // Allow string indexing
}

interface ForecastEntry {
  ds: string;
  yhat_lower_rescaled: number;
  yhat_rescaled: number;
  yhat_upper_rescaled: number;
}

interface PredictionResponse {
  forecast: ForecastEntry[];
  model: string;
  status: string;
  unit: string;
}

@Component({
  selector: 'app-co2-emissions',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    HttpClientModule,
  ],
  templateUrl: './co2-emissions.component.html',
  styleUrl: './co2-emissions.component.scss',
})
export class Co2EmissionsComponent implements OnInit {
  co2Form: FormGroup;
  isLoading = false;
  prediction: PredictionResponse | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {
    this.co2Form = this.fb.group({
      date: ['', [Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)]],
      total_emissions: ['', [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.co2Form.valid) {
      this.isLoading = true;
      this.prediction = null;

      console.log('Form Values:', this.co2Form.value);

      const payload: PredictionPayload = {
        date: this.co2Form.get('date')?.value,
        total_emissions: parseFloat(this.co2Form.get('total_emissions')?.value || '0'),
      };

      console.log('Payload:', payload);
      console.log('Payload JSON:', JSON.stringify(payload, null, 2));

      const missingFields = ['date', 'total_emissions'].filter(
        (field) => payload[field] === null || payload[field] === undefined || (typeof payload[field] === 'number' && isNaN(payload[field]))
      );
      if (missingFields.length > 0) {
        this.isLoading = false;
        this.snackBar.open(`Champs manquants ou invalides: ${missingFields.join(', ')}`, 'Close', { duration: 5000 });
        return;
      }

      this.http
        .post('http://localhost:5002/predict_co2_emissions', payload)
        .subscribe({
          next: (response: any) => {
            this.isLoading = false;
            console.log('Response:', response);
            if (response.forecast && response.model && response.status && response.unit) {
              this.prediction = {
                forecast: response.forecast,
                model: response.model,
                status: response.status,
                unit: response.unit,
              };
              this.snackBar.open('Prédiction réussie !', 'Close', { duration: 3000 });
            } else {
              this.snackBar.open('Réponse inattendue du serveur', 'Close', { duration: 3000 });
            }
          },
          error: (error) => {
            this.isLoading = false;
            console.error('Error:', error);
            const errorMessage = error.error?.error || 'Échec de la prédiction';
            this.snackBar.open(errorMessage, 'Close', { duration: 5000 });
            console.log('Error Details:', error.error);
          },
        });
    } else {
      this.co2Form.markAllAsTouched();
      console.log('Form is invalid:', this.co2Form.errors);
      Object.keys(this.co2Form.controls).forEach((key) => {
        const controlErrors = this.co2Form.get(key)?.errors;
        if (controlErrors) {
          console.log(`Field ${key} Errors:`, controlErrors);
        }
      });
      this.snackBar.open('Veuillez remplir tous les champs requis correctement.', 'Close', { duration: 5000 });
    }
  }
}