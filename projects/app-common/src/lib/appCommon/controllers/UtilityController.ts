import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UtilityController {
    // check language is arabic or not
    public isArabicLang(): boolean {
        return localStorage.getItem('lang') == 'ar';
    }


    getCurrentLang() {
        let lang = localStorage.getItem('lang');
        return lang ? lang : "ar";
    }

    // check Bit  is set  or not
    public isBitSetted(value: number, bitNum: number): boolean {
        if ((value >> (bitNum - 1)) && 1) {
            return true;
        } else {
            return false;
        }
    }


    disableF5Event() {
        window.addEventListener('keyup', disableF5);
        window.addEventListener('keydown', disableF5);

        function disableF5(e) {
            if ((e.which || e.keyCode) == 116) {
                e.preventDefault();
            }
        }
    }


}
