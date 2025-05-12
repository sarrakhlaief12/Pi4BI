import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { Auth, signOut } from '@angular/fire/auth';
import { inject } from '@angular/core';
import { UserService } from '../../dashboard/services/user.service'; // Assure-toi que le chemin est correct

@Component({
    selector: 'app-logout',
    standalone: true,
    imports: [RouterLink, MatButtonModule],
    templateUrl: './logout.component.html',
    styleUrls: ['./logout.component.scss']
})
export class LogoutComponent {

    private auth: Auth = inject(Auth);

    constructor(
        private router: Router,
        public themeService: CustomizerSettingsService,
        private userService: UserService
    ) {}

    async logout(): Promise<void> {
        try {
            await signOut(this.auth);

            // 🔁 Réinitialise manuellement le BehaviorSubject
            this.userService.clearUserData();

            // 🔁 Redirige vers la page d’authentification
            this.router.navigate(['/authentication']);
        } catch (error) {
            console.error('Erreur lors de la déconnexion :', error);
        }
    }
}
