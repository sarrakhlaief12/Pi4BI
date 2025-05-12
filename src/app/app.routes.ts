    import { Routes } from '@angular/router';
    import { EcommerceComponent } from './dashboard/ecommerce/ecommerce.component';
    import { UiElementsComponent } from './ui-elements/ui-elements.component';
    import { AlertsComponent } from './ui-elements/alerts/alerts.component';
    import { AutocompleteComponent } from './ui-elements/autocomplete/autocomplete.component';
    import { AvatarsComponent } from './ui-elements/avatars/avatars.component';
    import { AccordionComponent } from './ui-elements/accordion/accordion.component';
    import { BadgesComponent } from './ui-elements/badges/badges.component';
    import { BreadcrumbComponent } from './ui-elements/breadcrumb/breadcrumb.component';
    import { ButtonToggleComponent } from './ui-elements/button-toggle/button-toggle.component';
    import { BottomSheetComponent } from './ui-elements/bottom-sheet/bottom-sheet.component';
    import { ButtonsComponent } from './ui-elements/buttons/buttons.component';
    import { CardsComponent } from './ui-elements/cards/cards.component';
    import { CarouselsComponent } from './ui-elements/carousels/carousels.component';
    import { CheckboxComponent } from './ui-elements/checkbox/checkbox.component';
    import { ChipsComponent } from './ui-elements/chips/chips.component';
    import { ClipboardComponent } from './ui-elements/clipboard/clipboard.component';
    import { DatepickerComponent } from './ui-elements/datepicker/datepicker.component';
    import { DialogComponent } from './ui-elements/dialog/dialog.component';
    import { DividerComponent } from './ui-elements/divider/divider.component';
    import { DragDropComponent } from './ui-elements/drag-drop/drag-drop.component';
    import { ExpansionComponent } from './ui-elements/expansion/expansion.component';
    import { FormFieldComponent } from './ui-elements/form-field/form-field.component';
    import { GridListComponent } from './ui-elements/grid-list/grid-list.component';
    import { InputComponent } from './ui-elements/input/input.component';
    import { IconComponent } from './ui-elements/icon/icon.component';
    import { ListComponent } from './ui-elements/list/list.component';
    import { ListboxComponent } from './ui-elements/listbox/listbox.component';
    import { MenusComponent } from './ui-elements/menus/menus.component';
    import { PaginationComponent } from './ui-elements/pagination/pagination.component';
    import { ProgressBarComponent } from './ui-elements/progress-bar/progress-bar.component';
    import { RadioComponent } from './ui-elements/radio/radio.component';
    import { RatioComponent } from './ui-elements/ratio/ratio.component';
    import { SelectComponent } from './ui-elements/select/select.component';
    import { SidenavComponent } from './ui-elements/sidenav/sidenav.component';
    import { SlideToggleComponent } from './ui-elements/slide-toggle/slide-toggle.component';
    import { SliderComponent } from './ui-elements/slider/slider.component';
    import { SnackbarComponent } from './ui-elements/snackbar/snackbar.component';
    import { StepperComponent } from './ui-elements/stepper/stepper.component';
    import { ToolbarComponent } from './ui-elements/toolbar/toolbar.component';
    import { TableComponent } from './ui-elements/table/table.component';
    import { TabsComponent } from './ui-elements/tabs/tabs.component';
    import { ColorPickerComponent } from './ui-elements/color-picker/color-picker.component';
    import { CalendarComponent } from './apps/calendar/calendar.component';
    import { FormsComponent } from './forms/forms.component';
    import { BasicElementsComponent } from './forms/basic-elements/basic-elements.component';
    import { AdvancedElementsComponent } from './forms/advanced-elements/advanced-elements.component';
    import { WizardComponent } from './forms/wizard/wizard.component';
    import { EditorsComponent } from './forms/editors/editors.component';
    import { FileUploaderComponent } from './forms/file-uploader/file-uploader.component';
    import { DataTableComponent } from './tables/data-table/data-table.component';
    import { BasicTableComponent } from './tables/basic-table/basic-table.component';
    import { TablesComponent } from './tables/tables.component';
    import { MoreChartsComponent } from './apexcharts/more-charts/more-charts.component';
    import { PolarChartsComponent } from './apexcharts/polar-charts/polar-charts.component';
    import { PieChartsComponent } from './apexcharts/pie-charts/pie-charts.component';
    import { RadarChartsComponent } from './apexcharts/radar-charts/radar-charts.component';
    import { RadialBarChartsComponent } from './apexcharts/radial-bar-charts/radial-bar-charts.component';
    import { MixedChartsComponent } from './apexcharts/mixed-charts/mixed-charts.component';
    import { ColumnChartsComponent } from './apexcharts/column-charts/column-charts.component';
    import { AreaChartsComponent } from './apexcharts/area-charts/area-charts.component';
    import { LineChartsComponent } from './apexcharts/line-charts/line-charts.component';
    import { ApexchartsComponent } from './apexcharts/apexcharts.component';
    import { LogoutComponent } from './authentication/logout/logout.component';
    import { LockScreenComponent } from './authentication/lock-screen/lock-screen.component';
    import { SignInComponent } from './authentication/sign-in/sign-in.component';
    import { AuthenticationComponent } from './authentication/authentication.component';

    import { AuthGuard } from "../guards/auth.guard";
    import { NotFoundComponent } from "./common/not-found/not-found.component";
    //import { RecommendComponent } from "./dashboard/features/recommend/recommend.component";

    // Prediction Components - Import the main predictions component
    //import { PredictionsComponent } from './features/co2-emissions/';
    import { ResolutionTimeComponent } from './features/resolution-time/resolution-time.component';
    import { EquipmentFailureComponent } from './features/equipment-failure/equipment-failure.component';
    import { IncidentCountComponent } from './features/incident-count/incident-count.component';
    import { MaintenanceAlertComponent } from './features/maintenance-alert/maintenance-alert.component';
    import { Co2EmissionsComponent } from './features/co2-emissions/co2-emissions.component';
    import { Co2ForecastComponent } from './features/co2-forecast/co2-forecast.component';
    import { PredictionsComponent } from './features/predictions/predictions.component';
    export const routes: Routes = [
        { path: '', redirectTo: 'authentication', pathMatch: 'full' },
        { path: 'authentication', component: SignInComponent },
        { path: 'dashboard1', component: EcommerceComponent, canActivate: [AuthGuard] },
        { path: 'calendar', component: CalendarComponent, canActivate: [AuthGuard] },
        { path: 'logout', component: LogoutComponent, canActivate: [AuthGuard]},
    // { path: 'recommend', component: canActivate: [AuthGuard]},
        
        // New Predictions Routes
        {
            path: 'predictions',
            component: PredictionsComponent,
            canActivate: [AuthGuard],
            children: [
                { path: '', redirectTo: 'resolution-time', pathMatch: 'full' },
                { path: 'resolution-time', component: ResolutionTimeComponent },
                { path: 'equipment-failure', component: EquipmentFailureComponent },
                { path: 'incident-count', component: IncidentCountComponent },
                { path: 'maintenance-alert', component: MaintenanceAlertComponent },
                { path: 'co2-emissions', component: Co2EmissionsComponent },
                { path: 'co2-forecast', component: Co2ForecastComponent }
            ]
        },
        
        {path: '**', component: NotFoundComponent},

        {
            path: 'authentication',
            component: AuthenticationComponent,
            children: [
                { path: '', component: SignInComponent },
                { path: 'lock-screen', component: LockScreenComponent },

            ]
        },

        {
            path: 'charts',
            component: ApexchartsComponent,
            children: [
                {path: '', component: LineChartsComponent},
                {path: 'area', component: AreaChartsComponent},
                {path: 'column', component: ColumnChartsComponent},
                {path: 'mixed', component: MixedChartsComponent},
                {path: 'radialbar', component: RadialBarChartsComponent},
                {path: 'radar', component: RadarChartsComponent},
                {path: 'pie', component: PieChartsComponent},
                {path: 'polar', component: PolarChartsComponent},
                {path: 'more', component: MoreChartsComponent}
            ]
        },

        {
            path: 'tables',
            component: TablesComponent,
            children: [
                {path: '', component: BasicTableComponent},
                {path: 'data-table', component: DataTableComponent},
            ]
        },

        {
            path: 'ui-kit',
            component: UiElementsComponent,
            children: [
                {path: '', component: AlertsComponent},
                {path: 'autocomplete', component: AutocompleteComponent},
                {path: 'avatars', component: AvatarsComponent},
                {path: 'accordion', component: AccordionComponent},
                {path: 'badges', component: BadgesComponent},
                {path: 'breadcrumb', component: BreadcrumbComponent},
                {path: 'button-toggle', component: ButtonToggleComponent},
                {path: 'bottom-sheet', component: BottomSheetComponent},
                {path: 'buttons', component: ButtonsComponent},
                {path: 'cards', component: CardsComponent},
                {path: 'carousels', component: CarouselsComponent},
                {path: 'checkbox', component: CheckboxComponent},
                {path: 'chips', component: ChipsComponent},
                {path: 'color-picker', component: ColorPickerComponent},
                {path: 'clipboard', component: ClipboardComponent},
                {path: 'datepicker', component: DatepickerComponent},
                {path: 'dialog', component: DialogComponent},
                {path: 'divider', component: DividerComponent},
                {path: 'drag-drop', component: DragDropComponent},
                {path: 'expansion', component: ExpansionComponent},
                {path: 'form-field', component: FormFieldComponent},
                {path: 'grid-list', component: GridListComponent},
                {path: 'input', component: InputComponent},
                {path: 'icon', component: IconComponent},
                {path: 'list', component: ListComponent},
                {path: 'listbox', component: ListboxComponent},
                {path: 'menus', component: MenusComponent},
                {path: 'pagination', component: PaginationComponent},
                {path: 'progress-bar', component: ProgressBarComponent},
                {path: 'radio', component: RadioComponent},
                {path: 'ratio', component: RatioComponent},
                {path: 'select', component: SelectComponent},
                {path: 'sidenav', component: SidenavComponent},
                {path: 'slide-toggle', component: SlideToggleComponent},
                {path: 'slider', component: SliderComponent},
                {path: 'snackbar', component: SnackbarComponent},
                {path: 'stepper', component: StepperComponent},
                {path: 'toolbar', component: ToolbarComponent},
                {path: 'table', component: TableComponent},
                {path: 'tabs', component: TabsComponent},
            ]
        },

        {
            path: 'forms',
            component: FormsComponent,
            children: [
                {path: '', component: BasicElementsComponent},
                {path: 'advanced-elements', component: AdvancedElementsComponent},
                {path: 'wizard', component: WizardComponent},
                {path: 'editors', component: EditorsComponent},
                {path: 'file-uploader', component: FileUploaderComponent},
            ]
        }
    ];