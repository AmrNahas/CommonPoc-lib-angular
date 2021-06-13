// Import stylesheets
import * as CryptoJS from 'crypto-js';
import {Injectable} from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export   class   EncryptDecrypt {
    constructor() {
    }

    public static key:String="encryptionKey";


    static encrypt(str: any) {
       return  CryptoJS.AES.encrypt(str, this.key).toString();
    }

    static decrypt(str) {
        return  CryptoJS.AES.decrypt(str, this.key).toString(CryptoJS.enc.Utf8);
    }


}


