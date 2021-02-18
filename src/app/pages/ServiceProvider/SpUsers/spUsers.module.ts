import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';

import {SpUserComponent} from "./spUser.component";
import {SharedModule} from "../../../shared/shared.module";
import {NgxPaginationModule} from "ngx-pagination";
import {CustomPipesModule} from "../../../appCommon/customePipes/customPipes.module";
import {CustomDirectivesModule} from "../../../appCommon/customDirectivies/customDirectives.module";
import {FilterComponent} from "../../../appCommon/commonSegments/dataModelfilterSeg/filter.component";
import {Pagination} from "../../../appCommon/commonSegments/dataModelPaginationSeg/pagination.component";
import {EditSpUsersPemDialogComponent} from "./editSpUsersPerm/editSpUsersPem-dialog.component";
import {SpUserDialogComponent} from "./addSpUser/spUser-dialog.component";
import {SharedSegmentsModule} from "../../../appCommon/commonSegments/sharedSegments.module";



export const routes = [
    {path: '', redirectTo: 'sp-sys-users', pathMatch: 'full'},
    {path: 'sp-sys-users', component: SpUserComponent, data: {breadcrumb: 'SP.users',}},

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
        SpUserComponent,
        EditSpUsersPemDialogComponent,
        SpUserDialogComponent,


// if you wil use dataModel you must declare this two components
//         FilterComponent,
//         Pagination,

    ],

// put  all needed  entry  component you need for this module  like dialog
    entryComponents: [
        EditSpUsersPemDialogComponent,
        SpUserDialogComponent

    ]
})
export class SpUsersModule {
}
