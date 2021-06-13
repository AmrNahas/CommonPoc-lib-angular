import {Component, OnInit, ViewChild, HostListener, ViewChildren, QueryList} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';
import {PerfectScrollbarDirective} from 'ngx-perfect-scrollbar';
import {AppSettings} from '../app.settings';
import {Settings} from '../app.settings.model';
import {MenuService} from '../theme/components/menu/menu.service';

import {AuthUser} from '../AuthModule/AuthUser';
import {AuthService} from "../AuthModule/AuthService";


@Component({
    selector: 'app-pages',
    templateUrl: './pages.component.html',
    styleUrls: ['./pages.component.scss'],
    providers: [MenuService]
})
export class PagesComponent implements OnInit {
    @ViewChild('sidenav', {static: false}) sidenav: any;
    @ViewChild('backToTop', {static: true}) backToTop: any;
    @ViewChildren(PerfectScrollbarDirective) pss: QueryList<PerfectScrollbarDirective>;
    public settings: Settings;
    public menus = ['vertical', 'horizontal'];
    public menuOption: string;
    public menuTypes = ['default', 'compact', 'mini'];
    public menuTypeOption: string;
    public lastScrollTop: number = 0;
    public showBackToTop: boolean = false;
    public toggleSearchBar: boolean = false;
    private defaultMenu: string; //declared for return default menu when window resized
    public authUser: AuthUser;
    public userLoggedIn: boolean;
    public partyId: any;
    public isSpParty: boolean;

    constructor(public appSettings: AppSettings, public router: Router, private menuService: MenuService, public authService: AuthService) {
        this.settings = this.appSettings.settings;
        var themeValue = localStorage.getItem('theme');
        if (themeValue != null) {
            this.settings.theme = themeValue;
        }

        var langValue = localStorage.getItem('lang');
        if (langValue != null) {
            this.settings.rtl = localStorage.getItem('lang') == 'en';

        }
        this.userLoggedIn = authService.validateToken();
        this.authUser = authService.currentUserValue;


    }

    ngOnInit() {
        if (window.innerWidth <= 768) {
            this.settings.menu = 'vertical';
            this.settings.sidenavIsOpened = false;
            this.settings.sidenavIsPinned = false;
        }
        this.menuOption = this.settings.menu;
        this.menuTypeOption = this.settings.menuType;
        this.defaultMenu = this.settings.menu;
        if(this.userLoggedIn){
                this.isSpParty=true;
        }
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.settings.loadingSpinner = false;
        }, 100);
        this.backToTop.nativeElement.style.display = 'none';
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                if (!this.settings.sidenavIsPinned) {
                    this.sidenav.close();
                }
                if (window.innerWidth <= 768) {
                    this.sidenav.close();
                }
            }
        });
        if (this.settings.menu == 'vertical') {
            this.menuService.expandActiveSubMenu(this.menuService.getVerticalMenuItems());
        }
    }

    public chooseMenu() {
        this.settings.menu = this.menuOption;
        this.defaultMenu = this.menuOption;
        this.router.navigate(['/']);
    }

    public chooseMenuType() {
        this.settings.menuType = this.menuTypeOption;
    }

    public changeTheme(theme) {
        this.settings.theme = theme;
        localStorage.setItem('theme', theme);
    }

    public toggleSidenav() {
        this.sidenav.toggle();
    }

    public onPsScrollY(event) {
        (event.target.scrollTop > 300) ? this.backToTop.nativeElement.style.display = 'flex' : this.backToTop.nativeElement.style.display = 'none';
        if (this.settings.menu == 'horizontal') {
            if (this.settings.fixedHeader) {
                var currentScrollTop = (event.target.scrollTop > 56) ? event.target.scrollTop : 0;
                if (currentScrollTop > this.lastScrollTop) {
                    document.querySelector('#horizontal-menu').classList.add('sticky');
                    event.target.classList.add('horizontal-menu-hidden');
                } else {
                    document.querySelector('#horizontal-menu').classList.remove('sticky');
                    event.target.classList.remove('horizontal-menu-hidden');
                }
                this.lastScrollTop = currentScrollTop;
            } else {
                if (event.target.scrollTop > 56) {
                    document.querySelector('#horizontal-menu').classList.add('sticky');
                    event.target.classList.add('horizontal-menu-hidden');
                } else {
                    document.querySelector('#horizontal-menu').classList.remove('sticky');
                    event.target.classList.remove('horizontal-menu-hidden');
                }
            }
        }
    }

    public scrollToTop() {
        this.pss.forEach(ps => {
            if (ps.elementRef.nativeElement.id == 'main' || ps.elementRef.nativeElement.id == 'main-content') {
                ps.scrollToTop(0, 250);
            }
        });
    }


    @HostListener('window:resize')
    public onWindowResize(): void {
        if (window.innerWidth <= 768) {
            this.settings.sidenavIsOpened = false;
            this.settings.sidenavIsPinned = false;
            this.settings.menu = 'vertical';
        } else {
            (this.defaultMenu == 'horizontal') ? this.settings.menu = 'horizontal' : this.settings.menu = 'vertical';
            this.settings.sidenavIsOpened = true;
            this.settings.sidenavIsPinned = true;
        }
    }

    public closeSubMenus() {
        let menu = document.querySelector('.sidenav-menu-outer');
        if (menu) {
            for (let i = 0; i < menu.children[0].children.length; i++) {
                let child = menu.children[0].children[i];
                if (child) {
                    if (child.children[0].classList.contains('expanded')) {
                        child.children[0].classList.remove('expanded');
                        child.children[1].classList.remove('show');
                    }
                }
            }
        }
    }

}
