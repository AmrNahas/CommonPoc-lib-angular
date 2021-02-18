import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { QuillModule } from 'ngx-quill'
import { SharedModule } from '../../shared/shared.module';
import { PipesModule } from '../../theme/pipes/pipes.module';
import { MailboxComponent } from './mailbox.component';
import {TranslateModule} from "@ngx-translate/core";
import {SharedSegmentsModule} from "../../appCommon/commonSegments/sharedSegments.module";

export const routes = [
  { path: '', component: MailboxComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    PerfectScrollbarModule,
    QuillModule.forRoot(),
    SharedModule,
    PipesModule,
    TranslateModule,
    SharedSegmentsModule
  ],
  declarations: [
    MailboxComponent
  ]
})
export class MailboxModule { }
