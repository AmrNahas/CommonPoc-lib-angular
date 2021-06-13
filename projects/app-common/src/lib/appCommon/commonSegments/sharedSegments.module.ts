import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {TranslateModule} from "@ngx-translate/core";
import {NgxPaginationModule} from "ngx-pagination";
import {SharedModule} from "../sharedModules/shared.module";
import {FilterComponent} from "./dataModelfilterSeg/filter.component";
import {Pagination} from "./dataModelPaginationSeg/pagination.component";


@NgModule({
    // import  all modules  you need for this module
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        ReactiveFormsModule,
        TranslateModule,
        NgxPaginationModule,

    ],
    // declare all component you need for this module
    declarations: [
        FilterComponent,
        Pagination,
    ],
    exports: [
        FilterComponent,
        Pagination,
    ],

// put  all needed  entry  component you need for this module  like dialog
    entryComponents:[
]
})
export class SharedSegmentsModule {
}
