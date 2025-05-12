import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {UserService} from "../services/user.service";


@Component({
    selector: 'app-ecommerce',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './ecommerce.component.html',
    styleUrls: ['./ecommerce.component.scss']
})
export class EcommerceComponent implements OnInit {
    role: string = '';

    constructor(
        private router: Router,
        private userService: UserService
    ) {}

    ngOnInit(): void {
        this.userService.userData$.subscribe(userData => {
            if (userData) {
                this.role = userData.role;


            }
        });
    }
}
