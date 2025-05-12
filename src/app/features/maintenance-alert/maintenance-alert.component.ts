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
  Energy_Type: string;
  Maintenance_Cycle: string;
  Estimated_Lifetime_Years: number;
  equipement_category: string;
  Manufacturer: string;
  Transport_Type: string;
  Environmental_Certifications: string;
  Sustainability_Program: string;
  Priorite: string;
  notification_categorie: string;
  CO2_Emissions_kg_scaled?: number; // Optional, may not be required for prediction
  [key: string]: any; // Allow string indexing
}

interface PredictionResponse {
  prediction: number;
  unit: string;
}

@Component({
  selector: 'app-maintenance-alert',
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
  templateUrl: './maintenance-alert.component.html',
  styleUrl: './maintenance-alert.component.scss',
})
export class MaintenanceAlertComponent implements OnInit {
  maintenanceForm: FormGroup;
  isLoading = false;
  prediction: PredictionResponse | null = null;

  energyTypes = ['Fioul', 'Électricité', 'Gaz', 'Vapeur', 'Hydraulique'];
  maintenanceCycles = ['Mensuelle', 'Trimestrielle', 'Semestrielle', 'Annuelle'];
  equipmentCategories = ['Nettoyage', 'Conditionnement', 'Production', 'Stockage', 'Transport'];
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
  transportTypes = ['None', 'Camion', 'Train', 'Bateau', 'Avion'];
  environmentalCertifications = ['None', 'ISO 14001', 'LEED', 'Energy Star'];
  sustainabilityPrograms = ['None', 'Recyclage', 'Énergie Verte', 'Réduction CO2'];
  priorities = [
    { label: 'Faible', value: 'Faible' },
    { label: 'Moyenne', value: 'Moyenne' },
    { label: 'Élevée', value: 'Élevée' },
    { label: 'Critique', value: 'Critique' },
    { label: 'Crits', value: 'Crits' }, // Matches JSON
  ];
  notificationCategories = ['', 'Équipement', 'Importation', 'Système', 'Qualité', 'Fournisseur', 'Stock', 'Matériel', 'Critique'];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {
    this.maintenanceForm = this.fb.group({
      Energy_Type: ['', [Validators.required]],
      Maintenance_Cycle: ['', [Validators.required]],
      Estimated_Lifetime_Years: ['', [Validators.required, Validators.min(0)]],
      equipement_category: ['', [Validators.required]],
      Manufacturer: ['', [Validators.required]],
      Transport_Type: ['', [Validators.required]],
      Environmental_Certifications: ['', [Validators.required]],
      Sustainability_Program: ['', [Validators.required]],
      Priorite: ['', [Validators.required]],
      notification_categorie: ['', []], // Not required, can be empty
      CO2_Emissions_kg_scaled: ['', [Validators.min(0)]], // Optional
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.maintenanceForm.valid) {
      this.isLoading = true;
      this.prediction = null;

      console.log('Form Values:', this.maintenanceForm.value);

      const payload: PredictionPayload = {
        Energy_Type: this.maintenanceForm.get('Energy_Type')?.value,
        Maintenance_Cycle: this.maintenanceForm.get('Maintenance_Cycle')?.value,
        Estimated_Lifetime_Years: parseFloat(this.maintenanceForm.get('Estimated_Lifetime_Years')?.value || '0'),
        equipement_category: this.maintenanceForm.get('equipement_category')?.value,
        Manufacturer: this.maintenanceForm.get('Manufacturer')?.value,
        Transport_Type: this.maintenanceForm.get('Transport_Type')?.value,
        Environmental_Certifications: this.maintenanceForm.get('Environmental_Certifications')?.value,
        Sustainability_Program: this.maintenanceForm.get('Sustainability_Program')?.value,
        Priorite: this.maintenanceForm.get('Priorite')?.value,
        notification_categorie: this.maintenanceForm.get('notification_categorie')?.value,
      };

      // Include CO2_Emissions_kg_scaled only if provided
      const co2Value = this.maintenanceForm.get('CO2_Emissions_kg_scaled')?.value;
      if (co2Value !== '' && co2Value !== null) {
        payload.CO2_Emissions_kg_scaled = parseFloat(co2Value);
      }

      console.log('Payload:', payload);
      console.log('Payload JSON:', JSON.stringify(payload, null, 2));

      const missingFields = [
        'Energy_Type',
        'Maintenance_Cycle',
        'Estimated_Lifetime_Years',
        'equipement_category',
        'Manufacturer',
        'Transport_Type',
        'Environmental_Certifications',
        'Sustainability_Program',
        'Priorite',
      ].filter(
        (field) => payload[field] === null || payload[field] === undefined || (typeof payload[field] === 'number' && isNaN(payload[field]))
      );
      if (missingFields.length > 0) {
        this.isLoading = false;
        this.snackBar.open(`Champs manquants ou invalides: ${missingFields.join(', ')}`, 'Close', { duration: 5000 });
        return;
      }

      this.http
        .post('http://localhost:5002/predict', payload)
        .subscribe({
          next: (response: any) => {
            this.isLoading = false;
            console.log('Response:', response);
            if (response.prediction !== undefined && response.unit) {
              this.prediction = { prediction: response.prediction, unit: response.unit };
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
      this.maintenanceForm.markAllAsTouched();
      console.log('Form is invalid:', this.maintenanceForm.errors);
      Object.keys(this.maintenanceForm.controls).forEach((key) => {
        const controlErrors = this.maintenanceForm.get(key)?.errors;
        if (controlErrors) {
          console.log(`Field ${key} Errors:`, controlErrors);
        }
      });
      this.snackBar.open('Veuillez remplir tous les champs requis correctement.', 'Close', { duration: 5000 });
    }
  }
}