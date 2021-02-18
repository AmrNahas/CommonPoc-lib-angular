import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../../shared/shared.module';
import {TranslateModule} from '@ngx-translate/core';
import {NgxPaginationModule} from 'ngx-pagination';
import {Perms} from './permissions/sysPemrs/perms.component';
import {CustomPipesModule} from '../../appCommon/customePipes/customPipes.module';
import {CustomDirectivesModule} from '../../appCommon/customDirectivies/customDirectives.module';
import {AdminUserComponent} from './AdminUsers/adminUser.component';
import {UsersDialogComponent} from './AdminUsers/adminUsersOps/users-dialog.component';
import {EditUsersPemDialogComponent} from './AdminUsers/adminUsersOps/editUsersPerm/editUsersPem-dialog.component';
import {SharedSegmentsModule} from "../../appCommon/commonSegments/sharedSegments.module";
import {SpOrgComponent} from "./SpOrganisations/spOrg.component";


export const routes = [
    {path: '', redirectTo: 'sys-users', pathMatch: 'full'},
    {path: 'sys-users', component: AdminUserComponent, data: {breadcrumb: 'MENU.Adminstration.SystemUsers',}},
    {path: 'perms', component: Perms, data: {breadcrumb: 'MENU.Adminstration.systemPerms',perm:'214589'}},
    {path: 'spInfo', component: SpOrgComponent, data: {breadcrumb: 'GENERIC.sp',perm:'214589'}},


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
        // NgxMatFileInputModule,
        //file input
        // CommonComponentSegModule,
        SharedSegmentsModule

    ],
    // declare all component you need for this module
    declarations: [
        AdminUserComponent,
        EditUsersPemDialogComponent,
        UsersDialogComponent,
        Perms,
        SpOrgComponent


    ],

// put  all needed  entry  component you need for this module  like dialog
    entryComponents: [
        UsersDialogComponent,
        EditUsersPemDialogComponent,


    ]
})
export class AdminOpsModule {
}
