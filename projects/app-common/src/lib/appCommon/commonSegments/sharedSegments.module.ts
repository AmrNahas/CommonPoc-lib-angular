import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {TranslateModule} from "@ngx-translate/core";
import {NgxPaginationModule} from "ngx-pagination";
import {SharedModule} from "../sharedModules/shared.module";
import {FilterComponent} from "./dataModelfilterSeg/filter.component";
import {Pagination} from "./dataModelPaginationSeg/pagination.component";
import {NgbDatepickerModule} from "@ng-bootstrap/ng-bootstrap";
import {TableComponent} from "./TableComponent/Table.Component";


@NgModule({
    // import  all modules  you need for this module
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        ReactiveFormsModule,
        TranslateModule,
        NgxPaginationModule,
        NgbDatepickerModule,

    ],
    // declare all component you need for this module
    declarations: [
        FilterComponent,
        Pagination,
        TableComponent
    ],
    exports: [
        FilterComponent,
        Pagination,
        TableComponent
    ],

// put  all needed  entry  component you need for this module  like dialog
    entryComponents:[
]
})
export class SharedSegmentsModule {
}
