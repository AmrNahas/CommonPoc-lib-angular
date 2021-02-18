import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AppSettings} from '../../../app.settings';
import {Settings} from '../../../app.settings.model';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-settings-menu',
    templateUrl: './settings-menu.component.html',
    styleUrls: ['./settings-menu.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SettingsMenu implements OnInit {

    public settings: Settings;
    public themeTypeDark: Boolean;

    constructor(public appSettings: AppSettings,public translate: TranslateService) {
        this.settings = this.appSettings.settings;
        this.themeTypeDark= localStorage.getItem('theme') !='teal-light' ;
        this.settings = this.appSettings.settings;
    }


    ngOnInit() {
    }

    public changeTheme(theme){
        this.settings.theme = theme;
        localStorage.setItem('theme', theme);
        this.themeTypeDark= localStorage.getItem('theme') !='teal-light' ;
    }

}
