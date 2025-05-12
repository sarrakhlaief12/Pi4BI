import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';



import { ToDoListComponent } from '../pages/project-management-page/pm-project-overview/to-do-list/to-do-list.component';



@Component({
    selector: 'app-widgets',
    imports: [RouterLink, ToDoListComponent],
    templateUrl: './widgets.component.html',
    styleUrl: './widgets.component.scss'
})
export class WidgetsComponent {}
