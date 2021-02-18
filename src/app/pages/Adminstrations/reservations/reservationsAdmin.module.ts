import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {SharedModule} from "../../../shared/shared.module";
import {NgxPaginationModule} from "ngx-pagination";
import {CustomPipesModule} from "../../../appCommon/customePipes/customPipes.module";
import {CustomDirectivesModule} from "../../../appCommon/customDirectivies/customDirectives.module";
import {SharedSegmentsModule} from "../../../appCommon/commonSegments/sharedSegments.module";
import {HiringVResvComponent} from "./hiringVehicleResv/hiringVResv.component";
import {HiringVResvDialogComponent} from "./hiringVehicleResv/hiringVResv-dialog.component";


export const routes = [
    {path: '', redirectTo: 'vehiclesHiringResv', pathMatch: 'full'},
    {path: 'vehiclesHiringResv', component: HiringVResvComponent, data: {breadcrumb: 'resv.prev.resrv.hiring',}},

];

@NgModule({
    // import  all modules  you need for this module
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        SharedModule,
        ReactiveFormsModule,
        TranslateModule,
        NgxPaginationModule,
        //custom
        CustomPipesModule,
        CustomDirectivesModule,
        SharedSegmentsModule

    ],
    // declare all component you need for this module
    declarations: [
        HiringVResvComponent,
        HiringVResvDialogComponent,


    ],

// put  all needed  entry  component you need for this module  like dialog
    entryComponents: [
        HiringVResvDialogComponent,

    ]
})
export class ReservationsAdminModule {
}
