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
  Maintenance_Cycle: string;
  Estimated_Lifetime_Years: number;
  Manufacturer: string;
  jours_depuis_derniere_panne: number;
  pannes_par_an_vie: number;
  nb_pannes_total: number;
  [key: string]: any; // Allow string indexing
}

interface PredictionResponse {
  label: string;
  prediction: number;
}

@Component({
  selector: 'app-equipment-failure',
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
  templateUrl: './equipment-failure.component.html',
  styleUrl: './equipment-failure.component.scss',
})
export class EquipmentFailureComponent implements OnInit {
  failureForm: FormGroup;
  isLoading = false;
  prediction: PredictionResponse | null = null;

  maintenanceCycles = ['Mensuelle', 'Trimestrielle', 'Semestrielle', 'Annuelle'];
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

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {
    this.failureForm = this.fb.group({
      Maintenance_Cycle: ['', [Validators.required]],
      Estimated_Lifetime_Years: ['', [Validators.required, Validators.min(0)]],
      Manufacturer: ['', [Validators.required]],
      jours_depuis_derniere_panne: ['', [Validators.required, Validators.min(0)]],
      pannes_par_an_vie: ['', [Validators.required, Validators.min(0)]],
      nb_pannes_total: ['', [Validators.required, Validators.min(0), Validators.pattern('^[0-9]*$')]],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.failureForm.valid) {
      this.isLoading = true;
      this.prediction = null;

      console.log('Form Values:', this.failureForm.value);

      const payload: PredictionPayload = {
        Maintenance_Cycle: this.failureForm.get('Maintenance_Cycle')?.value,
        Estimated_Lifetime_Years: parseFloat(this.failureForm.get('Estimated_Lifetime_Years')?.value || '0'),
        Manufacturer: this.failureForm.get('Manufacturer')?.value,
        jours_depuis_derniere_panne: parseInt(this.failureForm.get('jours_depuis_derniere_panne')?.value || '0', 10),
        pannes_par_an_vie: parseFloat(this.failureForm.get('pannes_par_an_vie')?.value || '0'),
        nb_pannes_total: parseInt(this.failureForm.get('nb_pannes_total')?.value || '0', 10),
      };

      console.log('Payload:', payload);
      console.log('Payload JSON:', JSON.stringify(payload, null, 2));

      const missingFields = [
        'Maintenance_Cycle',
        'Estimated_Lifetime_Years',
        'Manufacturer',
        'jours_depuis_derniere_panne',
        'pannes_par_an_vie',
        'nb_pannes_total',
      ].filter((field) => payload[field] === null || payload[field] === undefined || (typeof payload[field] === 'number' && isNaN(payload[field])));
      if (missingFields.length > 0) {
        this.isLoading = false;
        this.snackBar.open(`Champs manquants ou invalides: ${missingFields.join(', ')}`, 'Close', { duration: 5000 });
        return;
      }

      this.http
        .post('http://localhost:5002/predict_panne_30j', payload)
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
      this.failureForm.markAllAsTouched();
      console.log('Form is invalid:', this.failureForm.errors);
      Object.keys(this.failureForm.controls).forEach((key) => {
        const controlErrors = this.failureForm.get(key)?.errors;
        if (controlErrors) {
          console.log(`Field ${key} Errors:`, controlErrors);
        }
      });
      this.snackBar.open('Veuillez remplir tous les champs requis correctement.', 'Close', { duration: 5000 });
    }
  }
}