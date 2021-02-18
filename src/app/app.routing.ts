import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PagesComponent} from "./pages/pages.component";
import {AuthenticationGuard} from "./appCommon/guards/AuthenticationGuard";
import {LoginGuard} from "./appCommon/guards/LoginGuard";
import {ErrorComponent} from "./pages/errors/error/error.component";
import {NotFoundComponent} from "./pages/errors/not-found/not-found.component";
import {SpGuard} from "./appCommon/guards/SpGuard";


// AuthorizationGuard
export const routes: Routes = [
    {
        path: '',
        component: PagesComponent, children: [
            { path: '', loadChildren: () => import('./pages/publicPages/publicPages.module').then(m => m.PublicPagesModule), data: { breadcrumb: 'SP.vehicles' } },
            { path: 'users',canActivate:[AuthenticationGuard], loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule), data: { breadcrumb: 'MENU.Users' } },
            { path: 'profile',canActivate:[AuthenticationGuard], loadChildren: () => import ('./pages/profile/profile.module').then(m => m.ProfileModule), data: { breadcrumb: 'MENU.profile' } },
            { path: 'spDashboard',canActivate:[AuthenticationGuard,SpGuard], loadChildren: () => import('./pages/ServiceProvider/spDashboard/dashboard.module').then(m => m.DashboardModule), data: { breadcrumb: 'MENU.Dashboard' } },
            { path: 'notifications',canActivate:[AuthenticationGuard], loadChildren: () => import('./pages/notifications/userNotifications.module').then(m => m.UserNotificationsModule), data: { breadcrumb: 'GENERIC.notifications' } },
            { path: 'schedule',canActivate:[AuthenticationGuard], loadChildren: () => import('./pages/ServiceProvider/schedule/schedule.module').then(m => m.ScheduleModule), data: { breadcrumb: 'GENERIC.schedule' } },
            { path: 'support/:id',canActivate:[AuthenticationGuard], loadChildren: () => import('./pages/mailbox/mailbox.module').then(m => m.MailboxModule), data: { breadcrumb: 'MENU.help' } },
            { path: 'support',canActivate:[AuthenticationGuard], loadChildren: () => import('./pages/mailbox/mailbox.module').then(m => m.MailboxModule), data: { breadcrumb: 'MENU.help' } },


        ]
    },

    { path: 'landing',canActivate:[LoginGuard], loadChildren: () => import('./pages/landing/landing.module').then(m => m.LandingModule) },
    { path: 'login',canActivate:[LoginGuard], loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
    { path: 'custReg',canActivate:[LoginGuard], loadChildren: () => import('./pages/publicPages/CustRegister/CustReg.module').then(m => m.CustRegModule) },
    { path: 'error', component: ErrorComponent, data: { breadcrumb: 'Error' } },
    { path: '**', component: NotFoundComponent }
];

// onSameUrlNavigation:'reload'
@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            // preloadingStrategy: PreloadAllModules,  // <- comment this line for activate lazy load
            // useHash: true
        })
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }





