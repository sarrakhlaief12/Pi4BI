import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';

import { getAuth } from 'firebase/auth';
import {UserService} from "../app/dashboard/services/user.service";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private auth: Auth,
        private userService: UserService
    ) {}

    async canActivate(): Promise<boolean> {
        const user = getAuth().currentUser;

        if (!user) {
            await this.router.navigate(['/authentication']);
            return false;
        }

        const userData = await this.userService.fetchUserDataOnce(); // 🔁 Sécurise via Firestore
        const role = userData?.role;

        if (role === 'Responsable Comfirmité Environmentale' ||
            role === 'Responsable Achats' ||
            role === 'Responsable Maintenance' ||
            role === 'Responsable Développement Durable')
        {
            return true;
        } else {
            alert('Accès refusé : rôle non autorisé.');
            await this.router.navigate(['/authentication']);
            return false;
        }
    }
}
