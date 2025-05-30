import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { StarRatingComponent } from './star-rating/star-rating.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-e-product-details',
    imports: [RouterLink, MatCardModule, MatMenuModule, MatButtonModule, CarouselModule, NgFor, FormsModule, MatTabsModule, MatFormFieldModule, MatInputModule, FormsModule, StarRatingComponent, MatProgressBarModule],
    templateUrl: './e-product-details.component.html',
    styleUrl: './e-product-details.component.scss'
})
export class EProductDetailsComponent {

    // Star Rating
    selectedRating: number = 2;

    // Input Counter
    value = 1;
    increment() {
        this.value++;
    }
    decrement() {
        if (this.value > 1) {
            this.value--;
        }
    }

    // Product Images
    productImages = [
        {
            url: 'images/products/product-details1.jpg'
        },
        {
            url: 'images/products/product-details2.jpg'
        },
        {
            url: 'images/products/product-details3.jpg'
        },
        {
            url: 'images/products/product-details4.jpg'
        }
    ]
    selectedImage!: string;
    changeimage(image: string){
        this.selectedImage = image;
    }

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}