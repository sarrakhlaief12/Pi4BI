import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { QuantityCounterComponent } from './quantity-counter/quantity-counter.component';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-e-cart',
    imports: [MatCardModule, MatMenuModule, MatButtonModule, RouterLink, MatFormFieldModule, MatInputModule, FormsModule, QuantityCounterComponent],
    templateUrl: './e-cart.component.html',
    styleUrl: './e-cart.component.scss'
})
export class ECartComponent {

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}