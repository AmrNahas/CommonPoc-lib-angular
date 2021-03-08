import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FilterComponent} from "../../appCommon/commonSegments/dataModelfilterSeg/filter.component";
import {Pagination} from "../../appCommon/commonSegments/dataModelPaginationSeg/pagination.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../shared/shared.module";
import {TranslateModule} from "@ngx-translate/core";
import {NgxPaginationModule} from "ngx-pagination";
import {CustomPipesModule} from "../../appCommon/customePipes/customPipes.module";
import {CustomDirectivesModule} from "../../appCommon/customDirectivies/customDirectives.module";
import {ItemPaginationComponent} from "../../pages/publicPages/publicCommonSegments/itemsDataModelPaginationSeg/itemPagination.component";


@NgModule({
    // import  all modules  you need for this module
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        ReactiveFormsModule,
        TranslateModule,
        NgxPaginationModule,
        //custom
        CustomPipesModule,
        CustomDirectivesModule,

    ],
    // declare all component you need for this module
    declarations: [

        FilterComponent,
        Pagination,
        ItemPaginationComponent,
    ],
    exports: [

        FilterComponent,
        Pagination,
        ItemPaginationComponent,
    ],

// put  all needed  entry  component you need for this module  like dialog
    entryComponents:[
]
})
export class SharedSegmentsModule {
}
