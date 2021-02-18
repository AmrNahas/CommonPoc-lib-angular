import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {NgxPaginationModule} from "ngx-pagination";
import {VeichlesReqsComponent} from "./veichlsManagment/vehiclesRequests/veichlesReqs.component";
import {SharedModule} from "../../shared/shared.module";
import {CustomPipesModule} from "../../appCommon/customePipes/customPipes.module";
import {CustomDirectivesModule} from "../../appCommon/customDirectivies/customDirectives.module";
import {SvReqDialogComponent} from "./veichlsManagment/vehiclesRequests/vehiclesDialog/svReq-dialog.component";
import {SharedSegmentsModule} from "../../appCommon/commonSegments/sharedSegments.module";


export const routes = [
    {path: '', redirectTo: 'vehiclesRq', pathMatch: 'full'},
    {path: 'vehiclesRq', component: VeichlesReqsComponent , data: {breadcrumb: 'SP.vehicles',}},

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
        VeichlesReqsComponent,
        SvReqDialogComponent,


    ],

// put  all needed  entry  component you need for this module  like dialog
    entryComponents: [
        SvReqDialogComponent,


    ]
})
export class ServiceMngModule {
}
