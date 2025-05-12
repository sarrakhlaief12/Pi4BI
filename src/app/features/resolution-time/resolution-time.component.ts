import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

interface PredictionPayload {
  priorite: string; // Stringified integer (e.g., "0", "1")
  categorie_notification: string;
  Manufacturer: string;
  Estimated_Lifetime_Years: number;
  month: number;
  weekday: number;
  [key: string]: any; // Allow string indexing
}

@Component({
  selector: 'app-resolution-time',
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
  templateUrl: './resolution-time.component.html',
  styleUrl: './resolution-time.component.scss',
})
export class ResolutionTimeComponent implements OnInit {
  resolutionForm: FormGroup;
  isLoading = false;
  prediction: { value: number; unit: string } | null = null;

  priorities = [
    { label: 'Faible', value: '0' },
    { label: 'Moyenne', value: '1' },
    { label: 'Élevée', value: '2' },
    { label: 'Critique', value: '3' },
    { label: 'Fait', value: '4' },
  ];

  categories = [
    'Équipement',
    'Importation',
    'Système',
    'Qualité',
    'Fournisseur',
    'Stock',
    'Matériel',
    'Critique',
  ];

  manufacturers = [
    'AutoMix Inc.',
    'CleanTech Solutions',
    'EvapoTech Co.',
    'FillTech Ltd.',
    'Laiterie Machines Co.',
    'PackEquip SARL',
    'PasteurEquip Co.',
    'ProDairy Equipements',
    'QuickCool Systems',
    'RoboPack Inc.',
    'VisionInspect Ltd.',
  ];

  months = Array.from({ length: 12 }, (_, i) => i + 1);
  weekdays = [
    { value: 0, label: 'Lundi' },
    { value: 1, label: 'Mardi' },
    { value: 2, label: 'Mercredi' },
    { value: 3, label: 'Jeudi' },
    { value: 4, label: 'Vendredi' },
    { value: 5, label: 'Samedi' },
    { value: 6, label: 'Dimanche' },
  ];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {
    this.resolutionForm = this.fb.group({
      priorite: ['', [Validators.required]],
      categorie_notification: ['', [Validators.required]],
      Manufacturer: ['', [Validators.required]],
      Estimated_Lifetime_Years: ['', [Validators.required, Validators.min(0)]],
      month: ['', [Validators.required, Validators.min(1), Validators.max(12)]],
      weekday: ['', [Validators.required, Validators.min(0), Validators.max(6)]],
    });
  }

  ngOnInit(): void {
    // Set default values for testing
    // Comment out or remove this in production
    this.resolutionForm.patchValue({
      priorite: '1',
      categorie_notification: 'Équipement',
      Manufacturer: 'FillTech Ltd.',
      Estimated_Lifetime_Years: 3,
      month: 5,
      weekday: 2
    });
  }

  onSubmit(): void {
    if (this.resolutionForm.valid) {
      this.isLoading = true;
      this.prediction = null;

      console.log('Form Values:', this.resolutionForm.value);

      // Create a clean payload object matching exactly what the backend expects
      const rawPayload = {
        priorite: this.resolutionForm.get('priorite')?.value,
        categorie_notification: this.resolutionForm.get('categorie_notification')?.value,
        Manufacturer: this.resolutionForm.get('Manufacturer')?.value,
        Estimated_Lifetime_Years: this.resolutionForm.get('Estimated_Lifetime_Years')?.value,
        month: this.resolutionForm.get('month')?.value,
        weekday: this.resolutionForm.get('weekday')?.value
      };

      // Create properly typed payload
      const payload: PredictionPayload = {
        priorite: String(rawPayload.priorite || ''),
        categorie_notification: String(rawPayload.categorie_notification || ''),
        Manufacturer: String(rawPayload.Manufacturer || ''),
        Estimated_Lifetime_Years: Number(rawPayload.Estimated_Lifetime_Years || 0),
        month: Number(rawPayload.month || 0),
        weekday: Number(rawPayload.weekday || 0)
      };

      console.log('Payload:', payload);
      console.log('Payload JSON:', JSON.stringify(payload, null, 2));

      // Define HTTP options with proper headers
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          // CORS headers that might be needed
          'Accept': 'application/json'
        }),
        // Enable withCredentials if your API requires authentication
        withCredentials: false
      };

      // Make the HTTP request
      this.http
        .post('http://localhost:5002/predict_resolution', payload, httpOptions)
        .pipe(
          catchError(error => {
            console.error('Request failed:', error);
            
            // Log detailed error info
            if (error.error instanceof ErrorEvent) {
              console.error('Client-side error:', error.error.message);
            } else {
              console.error(`Backend returned code ${error.status}, body:`, error.error);
            }
            
            return throwError(() => new Error('Something went wrong. Please try again later.'));
          })
        )
        .subscribe({
          next: (response: any) => {
            this.isLoading = false;
            console.log('Response:', response);
            if (response.prediction !== undefined && response.unit) {
              this.prediction = { value: response.prediction, unit: response.unit };
              this.snackBar.open('Prédiction réussie !', 'Close', { duration: 3000 });
            } else {
              this.snackBar.open('Réponse inattendue du serveur', 'Close', { duration: 3000 });
            }
          },
          error: (error) => {
            this.isLoading = false;
            console.error('Error in subscriber:', error);
            const errorMessage = error?.message || 'Échec de la prédiction';
            this.snackBar.open(errorMessage, 'Close', { duration: 5000 });
          },
        });
    } else {
      this.resolutionForm.markAllAsTouched();
      console.log('Form is invalid:', this.resolutionForm.errors);
      Object.keys(this.resolutionForm.controls).forEach((key) => {
        const controlErrors = this.resolutionForm.get(key)?.errors;
        if (controlErrors) {
          console.log(`Field ${key} Errors:`, controlErrors);
        }
      });
      this.snackBar.open('Veuillez remplir tous les champs requis correctement.', 'Close', { duration: 5000 });
    }
  }
}