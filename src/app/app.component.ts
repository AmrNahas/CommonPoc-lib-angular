import {Component} from '@angular/core';
import {AppSettings} from './app.settings';
import {Settings} from './app.settings.model';

import {Router} from '@angular/router';
import {User} from './models/user';
import {TranslateService} from '@ngx-translate/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']

})
export class AppComponent {
  public settings: Settings;
  public user: User;

  constructor(public appSettings: AppSettings, private router: Router
      ,  public translate: TranslateService) {
    this.settings = this.appSettings.settings;

    //localization
    translate.addLangs(['en', 'ar']);
    translate.setDefaultLang('ar');
    const browserLang = translate.getBrowserLang();
    translate.use("ar");

  }

  ngOnInit() {
    console.log('on init App  fired');
  }

  public getDir() {
    this.appSettings.settings.rtl=localStorage.getItem('lang') != 'en';
    return localStorage.getItem('lang') != 'en' ? 'rtl' : 'ltr';

  }

}
