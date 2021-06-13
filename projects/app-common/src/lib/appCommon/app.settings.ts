import { Injectable } from '@angular/core';
import {Settings} from "./app.settings.model";


@Injectable()
export class AppSettings {


    constructor() {
        console.log('settings loaded')
    }

    public settings = new Settings(
        'Ershad',   //theme name
        true,       //loadingSpinner
        true,       //fixedHeader
        true,       //sidenavIsOpened
        true,       //sidenavIsPinned
        true,       //sidenavUserBlock
        'vertical', //horizontal , vertical
        'default',  //default, compact, mini
        localStorage.getItem('theme')=='green-dark'?'green-dark':'indigo-light',   //indigo-light, teal-light, red-light, blue-dark, green-dark, pink-dark indigo-light
        localStorage.getItem('lang')=='ar'?true:false      // true = rtl, false = ltr

    )


}

