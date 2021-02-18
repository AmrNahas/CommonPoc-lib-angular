import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'angular-calendar';
import { ScheduleComponent } from './schedule.component';
import { ScheduleDialogComponent } from './schedule-dialog/schedule-dialog.component';
import {SharedModule} from "../../../shared/shared.module";
import {TranslateModule} from "@ngx-translate/core";

export const routes = [
  { path: '', component: ScheduleComponent, pathMatch: 'full' }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule,
        CalendarModule,
        SharedModule,
        TranslateModule
    ],
  declarations: [
    ScheduleComponent, 
    ScheduleDialogComponent
  ] 
})
export class ScheduleModule { }
