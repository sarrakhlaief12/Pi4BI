import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface PredictionPayload {
  Category: string;
  Energy_Type: string;
  Maintenance_Frequency: string;
  [key: string]: any; // Allow string indexing
}

interface PredictionResponse {
  label: string;
  prediction: number;
}

@Component({
  selector: 'app-incident-count',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    HttpClientModule,
  ],
  templateUrl: './incident-count.component.html',
  styleUrl: './incident-count.component.scss',
})
export class IncidentCountComponent implements OnInit {
  incidentForm: FormGroup;
  isLoading = false;
  prediction: PredictionResponse | null = null;

  categories = [
    'Conditionnement',
    'Production',
    'Stockage',
    'Transport',
    'Qualité',
    'Maintenance',
  ];
  energyTypes = ['Fioul', 'Électricité', 'Gaz', 'Vapeur', 'Hydraulique'];
  maintenanceFrequencies = ['Mensuel', 'Trimestriel', 'Semestriel', 'Annuel'];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {
    this.incidentForm = this.fb.group({
      Category: ['', [Validators.required]],
      Energy_Type: ['', [Validators.required]],
      Maintenance_Frequency: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.incidentForm.valid) {
      this.isLoading = true;
      this.prediction = null;

      console.log('Form Values:', this.incidentForm.value);

      const payload: PredictionPayload = {
        Category: this.incidentForm.get('Category')?.value,
        Energy_Type: this.incidentForm.get('Energy_Type')?.value,
        Maintenance_Frequency: this.incidentForm.get('Maintenance_Frequency')?.value,
      };

      console.log('Payload:', payload);
      console.log('Payload JSON:', JSON.stringify(payload, null, 2));

      const missingFields = ['Category', 'Energy_Type', 'Maintenance_Frequency'].filter(
        (field) => payload[field] === null || payload[field] === undefined
      );
      if (missingFields.length > 0) {
        this.isLoading = false;
        this.snackBar.open(`Champs manquants: ${missingFields.join(', ')}`, 'Close', { duration: 5000 });
        return;
      }

      this.http
        .post('http://localhost:5002/predict_criticality', payload)
        .subscribe({
          next: (response: any) => {
            this.isLoading = false;
            console.log('Response:', response);
            if (response.label && response.prediction !== undefined) {
              this.prediction = { label: response.label, prediction: response.prediction };
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
      this.incidentForm.markAllAsTouched();
      console.log('Form is invalid:', this.incidentForm.errors);
      Object.keys(this.incidentForm.controls).forEach((key) => {
        const controlErrors = this.incidentForm.get(key)?.errors;
        if (controlErrors) {
          console.log(`Field ${key} Errors:`, controlErrors);
        }
      });
      this.snackBar.open('Veuillez remplir tous les champs requis correctement.', 'Close', { duration: 5000 });
    }
  }
}