import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {SharedModule} from '../../shared/shared.module';
import {LandComponent} from './landing/land.component';
import {TranslateModule} from '@ngx-translate/core';
import {CustomPipesModule} from '../../appCommon/customePipes/customPipes.module';
import {welcomeComponent} from "./welcome/welcome.component";
import {SharedSegmentsModule} from "../../appCommon/commonSegments/sharedSegments.module";
import {NgxPaginationModule} from "ngx-pagination";
import {NgxContentLoadingModule} from "ngx-content-loading";
import {ItemsfilterComponent} from "./publicCommonSegments/itemsDataModelfilterSeg/itemsfilter.component";
import {ItemPaginationComponent} from "./publicCommonSegments/itemsDataModelPaginationSeg/itemPagination.component";
import {ResvDialogComponent} from "./reservation/resv-dialog.component";



export const routes = [
    // { path: '', component: LandingComponent, pathMatch: 'full' },
    {path: '', component: welcomeComponent, pathMatch: 'full'},
    {path: 'search', component: LandComponent, pathMatch: 'full'},


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
        LandComponent,
        welcomeComponent,
        ItemsfilterComponent,
        ItemPaginationComponent,
        ResvDialogComponent
    ]
    ,
    exports: [

        ItemsfilterComponent,
        ItemPaginationComponent,
        ResvDialogComponent
    ],
})
export class PublicPagesModule {
}
