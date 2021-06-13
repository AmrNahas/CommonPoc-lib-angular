import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {SharedModule} from '../../shared/shared.module';
// import {LandComponent} from './landing/land.component';
import {TranslateModule} from '@ngx-translate/core';
import {welcomeComponent} from "./welcome/welcome.component";
import {NgxPaginationModule} from "ngx-pagination";
import {NgxContentLoadingModule} from "ngx-content-loading";
import {CustomPipesModule} from "../../common/customePipes/customPipes.module";
import {SharedSegmentsModule} from "../../../../projects/app-common/src/lib/appCommon/commonSegments/sharedSegments.module";



export const routes = [
    // { path: '', component: LandingComponent, pathMatch: 'full' },
    {path: '', component: welcomeComponent, pathMatch: 'full'},
    // {path: 'search', component: LandingComponent, pathMatch: 'full'},


];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        // NgxChartsModule,
        PerfectScrollbarModule,
        SharedModule,
        ReactiveFormsModule,
        TranslateModule,
        CustomPipesModule,
        SharedSegmentsModule,
        NgxPaginationModule,
        NgxContentLoadingModule,

    ],
    declarations: [
        // LandingComponent,
        welcomeComponent,

    ]
    ,
    exports: [

    ],
})
export class PublicPagesModule {
}
