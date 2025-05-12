import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { doc, getDoc, getFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private userDataSubject = new BehaviorSubject<{ name: string, role: string } | null>(null);
    userData$ = this.userDataSubject.asObservable();

    constructor(private auth: Auth) {
        this.loadUserData(); // écoute globale
    }

    // 🔁 Appelé globalement pour updates
    private loadUserData() {
        import('@angular/fire/auth').then(({ onAuthStateChanged }) => {
            onAuthStateChanged(this.auth, async (user) => {
                if (user) {
                    const db = getFirestore();
                    const docRef = doc(db, 'users', user.uid);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        this.userDataSubject.next({ name: data['name'], role: data['role'] });
                    } else {
                        this.userDataSubject.next(null);
                    }
                } else {
                    this.userDataSubject.next(null);
                }
            });
        });
    }

    // ✅ Utilisable avec await
    public async fetchUserDataOnce(): Promise<{ name: string, role: string } | null> {
        const user = this.auth.currentUser;
        if (!user) return null;

        const db = getFirestore();
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            const userData = { name: data['name'], role: data['role'] };
            this.userDataSubject.next(userData); // synchronise le BehaviorSubject aussi
            return userData;
        } else {
            return null;
        }
    }

    public clearUserData(): void {
        this.userDataSubject.next(null);
    }

}
