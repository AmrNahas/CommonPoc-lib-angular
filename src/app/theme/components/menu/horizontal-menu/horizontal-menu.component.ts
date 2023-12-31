import {Component, OnInit, Input, ViewChild, ViewEncapsulation} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';
import {AppSettings} from '../../../../app.settings';
import {Settings} from '../../../../app.settings.model';
import {MenuService} from '../menu.service';
import {PartiesEnum} from '../../../../models/utilites/PartiesEnum';
import {MatMenuTrigger} from "@angular/material/menu";
import {UtilityController} from "../../../../../../projects/app-common/src/lib/appCommon/controllers/UtilityController";
import {AuthService} from "../../../../AuthModule/AuthService";


@Component({
    selector: 'app-horizontal-menu',
    templateUrl: './horizontal-menu.component.html',
    styleUrls: ['./horizontal-menu.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [MenuService]
})
export class HorizontalMenuComponent extends UtilityController implements OnInit {
    @Input('menuParentId') menuParentId;
    public menuItems: Array<any>;
    public settings: Settings;
    @ViewChild(MatMenuTrigger, {static: false}) trigger: MatMenuTrigger;
    public partyEnum = PartiesEnum;
    public partyId:string;

    constructor(public appSettings: AppSettings, public menuService: MenuService, public router: Router, private authService: AuthService) {
        super();
        this.settings = this.appSettings.settings;
        this.prepareMenuAsPerParty();
    }

    prepareMenuAsPerParty() {
        this.menuItems = this.menuService.getVerticalMenuItems();
       // this.menuItems = this.menuService.getHorizontalPublicMenuItems();// this.menuService.getHorizontalCustomerMenuItems();

     /*
        if (this.authService.validateToken()) {
            this.partyId=EncryptDecrypt.decrypt(localStorage.getItem('sec_sess_tpId'));
            if ( this.partyId== this.partyEnum.GUIDER.toString()) {
                this.menuItems = this.menuService.getHorizontalAdminMenuItems();
            } else if (this.partyId == this.partyEnum.STUDENT.toString()) {
                this.menuItems = this.menuService.getHorizontalCustomerMenuItems();
            }

            }
           else {
            /!*getHorizontalPublicMenuItems*!/
            this.menuItems = this.menuService.getHorizontalPublicMenuItems();// this.menuService.getHorizontalCustomerMenuItems();
        }*/

    }

    ngOnInit() {
        // todo  and user has permission for it
        this.menuItems = this.menuItems.filter(item => item.parentId == this.menuParentId && this.authService.isUserHavePerm(item.perm));
    }

    ngAfterViewInit() {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                if (this.settings.fixedHeader) {
                    let mainContent = document.getElementById('main-content');
                    if (mainContent) {
                        mainContent.scrollTop = 0;
                    }
                } else {
                    document.getElementsByClassName('mat-drawer-content')[0].scrollTop = 0;
                }
            }
        });
    }

}
