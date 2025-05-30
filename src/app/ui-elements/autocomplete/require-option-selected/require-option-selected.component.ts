import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
    selector: 'app-require-option-selected',
    imports: [
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
        MatCardModule
    ],
    templateUrl: './require-option-selected.component.html',
    styleUrl: './require-option-selected.component.scss'
})
export class RequireOptionSelectedComponent {

    // Require an Autocomplete Option to be Selected
    @ViewChild('input') input!: ElementRef<HTMLInputElement>;
    myControl = new FormControl('');
    options: string[] = ['One', 'Two', 'Three', 'Four', 'Five'];
    filteredOptions: string[];
    constructor() {
        this.filteredOptions = this.options.slice();
    }
    filter(): void {
        const filterValue = this.input.nativeElement.value.toLowerCase();
        this.filteredOptions = this.options.filter(o => o.toLowerCase().includes(filterValue));
    }

}