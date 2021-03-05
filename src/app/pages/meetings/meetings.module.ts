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
import {MeetingsComponent} from "./meetings.component";
import {AddMeetingDialogComponent} from "./addMeeting/addMeeting-dialog.component";
import {SharedSegmentsModule} from "../../appCommon/commonSegments/sharedSegments.module";


export const routes = [
  { path: '', component: MeetingsComponent, pathMatch: 'full' }
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
    MeetingsComponent,
      AddMeetingDialogComponent,
      ItemsfilterComponent,
      ItemPaginationComponent,
  ],
    exports:[
        ItemsfilterComponent,
        ItemPaginationComponent,
    ]
})
export class MeetingsModule { }
