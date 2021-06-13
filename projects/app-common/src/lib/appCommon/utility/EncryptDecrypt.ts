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
       return  CryptoJS.AES.encrypt(str, "encryptionKey").toString();
    }

    static decrypt(str) {
        return  CryptoJS.AES.decrypt(str, "encryptionKey").toString(CryptoJS.enc.Utf8);
    }


}


