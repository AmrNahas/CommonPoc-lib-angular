import { Injectable } from '@angular/core';

import {MatSnackBar} from '@angular/material/snack-bar';
import {TranslateService} from '@ngx-translate/core';
import {AppSettings} from '../../app.settings';

@Injectable({
    providedIn: 'root'
})
export class MessagesService {
    constructor(private snackBar: MatSnackBar,private appSettings: AppSettings,private translate: TranslateService) { }


    /*panelClass: ['messageError']
    verticalPosition:'top',*/
    // show message as is
    public showErrorMessage(message ) {
        this.snackBar.open( message, 'X', {
            duration: 5000,
            direction: localStorage.getItem('lang') == 'ar'?'rtl':'ltr' ,
            panelClass: ['messageError']
        });
    }

    // get  message from local
    public getMessageTranslation(key):string{
        let msg;
        this.translate.get(key).subscribe(
            data =>  msg= data
           ,
            error => msg= ''
            );
        return msg;
    }



    // show  message from local by  lang
    public getMessageTranslationByLang(key:string,lang:string) {
        //todo enhancement

        this.translate.use(lang);
        let value=this.getMessageTranslation(key);
        this.translate.use(localStorage.getItem('lang'));
        return value;
    }


      // show  message from local
    public showErrorMessageLocal(messageLocal) {
        var msgInfo= this.getMessageTranslation(messageLocal);
        this.snackBar.open( msgInfo, 'X', {
            duration: 2000,
            direction: localStorage.getItem('lang') == 'ar'?'rtl':'ltr' ,
            panelClass: ['messageError']
        });
    }



    public showInfoMessage(message) {
        this.snackBar.open( message, 'X', {
            duration: 5000,
            verticalPosition:'top',
            direction: localStorage.getItem('lang') == 'ar'?'rtl':'ltr' ,
            panelClass: ['messageInfo']
        });
    }

    /*verticalPosition:'top',
    panelClass: ['messageInfo']*/
    public showInfoMessageLocal(messageLocal) {
        var msgInfo= this.getMessageTranslation(messageLocal);
        this.snackBar.open( msgInfo, 'X', {
            duration: 2000,
            direction: localStorage.getItem('lang') == 'ar'?'rtl':'ltr' ,
        });
    }

    public showErrorMessageFullConfig(message,duration,verticalPosition) {
        this.snackBar.open( message, 'X', {
            duration: duration,
            verticalPosition:verticalPosition,
            direction: localStorage.getItem('lang') == 'ar'?'rtl':'ltr' ,
            panelClass: ['messageError']
        });
    }


}
