import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LandingComponent } from './landing.component';
import {TranslateModule} from "@ngx-translate/core";
import {SharedModule} from '../../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';


export const routes = [
  { path: '', component: LandingComponent, pathMatch: 'full' }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        SharedModule,
        TranslateModule,
        ReactiveFormsModule
    ],
  declarations: [
    LandingComponent
  ]
})
export class LandingModule { }
