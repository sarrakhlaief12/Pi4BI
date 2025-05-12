import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CustomizerSettingsService } from '../../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-quantity-counter',
    imports: [FormsModule],
    templateUrl: './quantity-counter.component.html',
    styleUrl: './quantity-counter.component.scss'
})
export class QuantityCounterComponent {

    @Input() initialValue = 1;
    value = 1;

    ngOnInit() {
        this.value = this.initialValue;
    }

    increment() {
        this.value++;
    }

    decrement() {
        if (this.value > 1) {
            this.value--;
        }
    }

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}