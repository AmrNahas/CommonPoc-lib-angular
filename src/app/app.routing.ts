import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PagesComponent} from "./pages/pages.component";
import {ErrorComponent} from "./pages/errors/error/error.component";
import {NotFoundComponent} from "./pages/errors/not-found/not-found.component";
import {AuthenticationGuard} from "./common/guards/AuthenticationGuard";
import {LoginGuard} from "./common/guards/LoginGuard";




// AuthorizationGuard
export const routes: Routes = [
    {
        path: '',
        component: PagesComponent, children: [
            { path: '', loadChildren: () => import('./pages/publicPages/publicPages.module').then(m => m.PublicPagesModule), data: { breadcrumb: 'SP.vehicles' } },
            { path: 'profile',canActivate:[AuthenticationGuard], loadChildren: () => import ('./pages/profile/profile.module').then(m => m.ProfileModule), data: { breadcrumb: 'MENU.profile' } },
            { path: 'example',canActivate:[AuthenticationGuard], loadChildren: () => import ('./pages/Example/example.module').then(m => m.ExampleModule), data: { breadcrumb: 'MENU.Users' } },

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





