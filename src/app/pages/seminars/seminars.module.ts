import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CalendarModule} from 'angular-calendar';
import {TranslateModule} from "@ngx-translate/core";
import {SharedModule} from "../../shared/shared.module";
import {ItemsfilterComponent} from "../publicPages/publicCommonSegments/itemsDataModelfilterSeg/itemsfilter.component";
import {ItemPaginationComponent} from "../publicPages/publicCommonSegments/itemsDataModelPaginationSeg/itemPagination.component";
import {PerfectScrollbarModule} from "ngx-perfect-scrollbar";
import {SharedSegmentsModule} from "../../appCommon/commonSegments/sharedSegments.module";
import {SeminarsComponent} from "./seminars.component";


export const routes = [
  { path: '', component: SeminarsComponent, pathMatch: 'full' }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule,
        CalendarModule,
        SharedModule,
        TranslateModule,
        PerfectScrollbarModule,
        SharedSegmentsModule,


    ],
  declarations: [
      SeminarsComponent,
      ItemsfilterComponent,
      ItemPaginationComponent,
  ],
    exports:[
        ItemsfilterComponent,
        ItemPaginationComponent,
    ]
})
export class SeminarsModule { }
