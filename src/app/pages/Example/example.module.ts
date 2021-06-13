import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../../shared/shared.module';
import {TranslateModule} from '@ngx-translate/core';
import {NgxPaginationModule} from 'ngx-pagination';
import {ExampleComponent} from "./DataPreview/example.component";
import {ExampleDialogComponent} from "./DataOps/example-dialog.component";
import {CustomPipesModule} from "../../common/customePipes/customPipes.module";
import {CustomDirectivesModule} from "../../common/customDirectivies/customDirectives.module";
import {SharedSegmentsModule} from "../../../../projects/app-common/src/lib/appCommon/commonSegments/sharedSegments.module";


export const routes = [
    { path: '', component:ExampleComponent, pathMatch: 'full' },

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
        ExampleComponent,
        ExampleDialogComponent,
    ],

// put  all needed  entry  component you need for this module  like dialog
    entryComponents: [
        ExampleDialogComponent,


    ]
})
export class ExampleModule {
}
