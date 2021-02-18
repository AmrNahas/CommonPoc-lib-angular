import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AppSettings} from '../../../app.settings';
import {Settings} from '../../../app.settings.model';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-flags-menu',
    templateUrl: './flags-menu.component.html',
    styleUrls: ['./flags-menu.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class FlagsMenuComponent implements OnInit {

    public settings: Settings;
    public rtlFlag: Boolean;


    constructor(public appSettings: AppSettings, public translate: TranslateService) {
        this.settings = this.appSettings.settings;
/*        this.rtlFlag = true;
        this.translate.use('ar');*/
    }


    public changeLang(lang) {
        this.settings.rtl = lang != 'en';
        localStorage.setItem('lang', lang);
        this.translate.use(lang);
        this.rtlFlag = lang != 'en';
    }

    ngOnInit() {
        let lang = localStorage.getItem('lang');
        if (lang && (lang=='ar' || lang=='en')) {
            this.rtlFlag = lang == 'ar';
            this.translate.use(lang);
        } else {
            this.rtlFlag = true;
            this.translate.use('ar');
        }
    }


}
