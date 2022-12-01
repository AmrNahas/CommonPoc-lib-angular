import {AbstractControl} from '@angular/forms';


// custom validation
export class GenericFormValidators {

    static KsaPhoneValidator(control: AbstractControl): { [key: string]: boolean } | null {
       const mobNumberPattern = "^((\\+91-?)|0)?[0-9]{9}$";
         if (control.value && (!control.value.match(mobNumberPattern) || !control.value.startsWith("5")) ) {
            return { 'ksaPhone': true };
        }
        return null;
    }

    static ageValidator(control: AbstractControl): { [key: string]: boolean } | null {
        if (control.value &&   parseInt(control.value) > 99   ) {
            console.warn("age validator")
            return { 'notNum': true };
        }
        return null;
    }


    static WithOutSpaceValidator(control: AbstractControl): { [key: string]: boolean } | null {
        if (control.value && (control.value.indexOf(" ") !== -1) ) {
            return { 'hasSpace': true };
        }

        return null;
    }

    static StartWithSpaceValidator(control: AbstractControl): { [key: string]: boolean } | null {
        if (control.value && (control.value.indexOf(' ') == 0) ) {
            return { 'startWithSpace': true };
        }
        return null;
    }


    static AgeValidator(control: AbstractControl): { [key: string]: boolean } | null {
        if (control.value > 18) {
            return { 'age': true };
        }
        return null;
    }





    /*static requiredFileType( type: string ) {
        return function (control: AbstractControl) {
            const file = control.value;
            if ( file ) {
                const extension = file.name.split('.')[1].toLowerCase();
                if ( type.toLowerCase() !== extension.toLowerCase() ) {
                    return {
                        requiredFileType: true
                    };
                }

                return null;
            }

            return null;
        };
    }*/

    // Number only validation
    static numeric(control: AbstractControl) {
        let val = control.value;

        if (val === null || val === '') return null;

        if (!val.toString().match(/^[0-9]+(\.?[0-9]+)?$/)) return { 'invalidNumber': true };

        return null;
}

}
