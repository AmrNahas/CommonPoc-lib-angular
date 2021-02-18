import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {SharedModule} from "../../../shared/shared.module";
import {NgxPaginationModule} from "ngx-pagination";
import {CustomPipesModule} from "../../../appCommon/customePipes/customPipes.module";
import {CustomDirectivesModule} from "../../../appCommon/customDirectivies/customDirectives.module";
import {SpVeichlesLisComponent} from "./spVeichle/addVeichle/spVeichlesLis.component";
import {AddSVDialogComponent} from "./spVeichle/addVeichle/addSV-dialog.component";
import {SpApprovedVeichlesListComponent} from "./spVeichle/ApprovedVeichle/spApprovedVeichlesList.component";
import {ViewSVDialogComponent} from "./spVeichle/ApprovedVeichle/viewSV-dialog.component";
import {SharedSegmentsModule} from "../../../appCommon/commonSegments/sharedSegments.module";


export const routes = [
    {path: '', redirectTo: 'sp-vehicles', pathMatch: 'full'},
    {path: 'sp-vehicles', component: SpApprovedVeichlesListComponent, data: {breadcrumb: 'SP.vehicles',}},
    {path: 'sp-vehicles-req', component: SpVeichlesLisComponent, data: {breadcrumb: 'sv.Reqs',}},
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
        SpVeichlesLisComponent,
        AddSVDialogComponent,
        SpApprovedVeichlesListComponent,
        ViewSVDialogComponent,
// if you wil use dataModel you must declare this two components
        /*FilterComponent,
        Pagination,*/

    ],

// put  all needed  entry  component you need for this module  like dialog
    entryComponents: [
        AddSVDialogComponent,
        ViewSVDialogComponent,

    ]
})
export class SpServicesModule {
}
