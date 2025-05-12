import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {catchError, throwError} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class RecommendationService {

    apiUrl = '';



    constructor(private http: HttpClient) {}

    predictFiliere(data: any) {
        return this.http.post('/api/recommend', data); // 😍 plus d’URL complète
    }

}
