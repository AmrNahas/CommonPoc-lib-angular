import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {UserNotificationsComp} from "./userNotificationsComp";
import {SharedModule} from "../../shared/shared.module";
import {NgxPaginationModule} from "ngx-pagination";
import {CustomPipesModule} from "../../appCommon/customePipes/customPipes.module";
import {CustomDirectivesModule} from "../../appCommon/customDirectivies/customDirectives.module";
import {SharedSegmentsModule} from "../../appCommon/commonSegments/sharedSegments.module";


export const routes = [
    {path: '', redirectTo: 'userNotifications', pathMatch: 'full'},
    {path: 'userNotifications', component: UserNotificationsComp, data: {breadcrumb: 'GENERIC.viewAll',}},
    // {path: 'sp-vehicles-req', component: SpVeichlesLisComponent, data: {breadcrumb: 'sv.Reqs',}},
];

@NgModule({
    // import  all modules  you need for this module
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        SharedModule,
        ReactiveFormsModule,
        TranslateModule,
        NgxPaginationModule,
        //custom
        CustomPipesModule,
        CustomDirectivesModule,
        SharedSegmentsModule

    ],
    // declare all component you need for this module
    declarations: [
        UserNotificationsComp


    ],

// put  all needed  entry  component you need for this module  like dialog
    entryComponents: [


    ]
})
export class UserNotificationsModule {
}
