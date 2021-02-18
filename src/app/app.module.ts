import {BrowserModule} from '@angular/platform-browser';
import {Injector, NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {OverlayContainer} from '@angular/cdk/overlay';
import {CustomOverlayContainer} from './theme/utils/custom-overlay-container';

import {AgmCoreModule} from '@agm/core';
import {PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {CalendarModule, DateAdapter} from 'angular-calendar';
import {SharedModule} from './shared/shared.module';
import {PipesModule} from './theme/pipes/pipes.module';
import {AppRoutingModule} from './app.routing';

import {AppComponent} from './app.component';
import {PagesComponent} from './pages/pages.component';
import {BlankComponent} from './pages/blank/blank.component';
import {NotFoundComponent} from './pages/errors/not-found/not-found.component';
import {ErrorComponent} from './pages/errors/error/error.component';
import {AppSettings} from './app.settings';

import {SidenavComponent} from './theme/components/sidenav/sidenav.component';
import {VerticalMenuComponent} from './theme/components/menu/vertical-menu/vertical-menu.component';
import {HorizontalMenuComponent} from './theme/components/menu/horizontal-menu/horizontal-menu.component';
import {BreadcrumbComponent} from './theme/components/breadcrumb/breadcrumb.component';
import {FlagsMenuComponent} from './theme/components/flags-menu/flags-menu.component';
import {FullScreenComponent} from './theme/components/fullscreen/fullscreen.component';
import {ApplicationsComponent} from './theme/components/applications/applications.component';
import {MessagesComponent} from './theme/components/messages/messages.component';
import {UserMenuComponent} from './theme/components/user-menu/user-menu.component';
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {SettingsMenu} from "./theme/components/settings-menu/settings-menu.component";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {PublicActionComponent} from "./theme/components/publicActions/public-action.component";
import {CustomDirectivesModule} from "./appCommon/customDirectivies/customDirectives.module";
import {CustomPipesModule} from "./appCommon/customePipes/customPipes.module";
import {AuthInterceptor} from "./appCommon/interceptors/AuthInterceptor";
import {MatPaginatorIntl} from "@angular/material/paginator";
import {PaginationCustomConfig} from "./appCommon/cofigurations/PaginationCustomConfig";
import {AuthorizationGuard} from "./appCommon/guards/AuthorizationGuard";
import {LoginGuard} from "./appCommon/guards/LoginGuard";
import {AuthService} from "./AuthModule/AuthService";
import {AuthenticationGuard} from "./appCommon/guards/AuthenticationGuard";
import {AdminGuard} from "./appCommon/guards/adminGuard";
import {SpGuard} from "./appCommon/guards/SpGuard";
import {AttImgDialogComponent} from "./appCommon/CustomeComponents/attachmentPreview/att-img-dialog.component";
import {AttImg64DialogComponent} from "./appCommon/CustomeComponents/attachmentBase64Preview/att-img64-dialog.component";
import {AgrementDialogComponent} from "./appCommon/CustomeComponents/AgreementViewDialoge/agrement-dialog.component";
import {NgxContentLoadingModule} from "ngx-content-loading";
import {MatBadgeModule} from "@angular/material/badge";
import {WebSocketService} from "./notifications/WebSocketService ";
import {NotificationsService} from "./services/userNotifications/NotificationsService ";


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    wheelPropagation: true,
    suppressScrollX: true
};

import * as tslib_1 from 'tslib';
import * as date_fns_2 from 'date-fns';
function adapterFactory() {
    return tslib_1.__assign(tslib_1.__assign({}),date_fns_2);
}

// localization
export function HttpLoaderFactory(http: HttpClient) {
    // return new TranslateHttpLoader(http);
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


//  injector   global variable    >>  you can import it and use all over app
export let AppInjector: Injector;

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyA1rF9bttCxRmsNdZYjW7FzIoyrul5jb-s'
        }),
        PerfectScrollbarModule,
        CalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory
        }),
        HttpClientModule,
        // NgxWebstorageModule.forRoot(),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),

        SharedModule,
        PipesModule,
        AppRoutingModule,
        TranslateModule,
        CustomDirectivesModule,
        CustomPipesModule,
        NgxContentLoadingModule,
        MatBadgeModule


    ],
    declarations: [
        AppComponent,
        PagesComponent,
        BlankComponent,
        NotFoundComponent,
        ErrorComponent,
        SidenavComponent,
        VerticalMenuComponent,
        HorizontalMenuComponent,
        BreadcrumbComponent,
        FlagsMenuComponent,
        FullScreenComponent,
        ApplicationsComponent,
        MessagesComponent,
        UserMenuComponent,
        SettingsMenu,
        PublicActionComponent,
        AttImgDialogComponent,
        AttImg64DialogComponent,
        AgrementDialogComponent,
    ],
    providers: [
        AppSettings, AuthService, AuthenticationGuard, LoginGuard, AuthorizationGuard, SpGuard, AdminGuard,WebSocketService,NotificationsService,
        {provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG},
        {provide: OverlayContainer, useClass: CustomOverlayContainer},
        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
        {provide: MatPaginatorIntl, useClass: PaginationCustomConfig},
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    // to save injector in global variable >>  so you can use it all over App
    constructor(private injector: Injector) {
        AppInjector = this.injector;
    }
}






