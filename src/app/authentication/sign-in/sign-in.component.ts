import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { inject } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { UserService } from '../../dashboard/services/user.service';

@Component({
    selector: 'app-sign-in',
    standalone: true,
    imports: [
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatCheckboxModule,
        ReactiveFormsModule,
        NgIf
    ],
    templateUrl: './sign-in.component.html',
    styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
    private _authForm: FormGroup;
    hide = true;
    private auth: Auth;

    get authForm(): FormGroup {
        return this._authForm;
    }

    constructor(
        private fb: FormBuilder,
        private router: Router,
        public themeService: CustomizerSettingsService,
        private userService: UserService
    ) {
        this._authForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8)]],
        });

        this.auth = inject(Auth);
    }

    async onSubmit() {
        if (!this.authForm.valid) {
            console.warn('Formulaire invalide');
            return;
        }

        const { email, password } = this.authForm.value;

        try {
            // 🔐 Authentification Firebase
            await signInWithEmailAndPassword(this.auth, email, password);

            // ✅ Récupération directe et mise à jour du BehaviorSubject
            const userData = await this.userService.fetchUserDataOnce();

            if (userData) {
                const { role } = userData;

                if (role === 'Responsable Comfirmité Environmentale' ||
                    role === 'Responsable Achats' ||
                    role === 'Responsable Maintenance' ||
                    role === 'Responsable Développement Durable')
                {
                    this.router.navigate(['/dashboard1']);
                } else {
                    alert('Rôle non autorisé');
                }
            } else {
                alert('Données utilisateur introuvables.');
            }

        } catch (error: any) {
            console.error('Erreur de connexion :', error.message);
            alert('Échec de connexion : ' + error.message);
        }
    }
}
