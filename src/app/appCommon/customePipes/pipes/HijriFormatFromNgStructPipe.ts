/*
import {Pipe, PipeTransform} from '@angular/core';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

@Pipe({name: 'hijriNumFormatFromNgStructDate'})
// convert hijri date from NgbDateStruct   to number format  like  14411211
export class HijriFormatFromNgStructPipe implements PipeTransform {
    transform(value: NgbDateStruct): number {
        let strValue: string = null;
        let numValue: number = null;
        if (value) {
            let month = value.month >= 10 ? value.month : ('0' + value.month); // convert 1   to 01
            let day = value.day     >= 10 ? value.day   : ('0' + value.day);
            let year = value.year ;
            strValue =year + '' + month + '' + day;

        }
        if (strValue != null) {
            numValue = +strValue;
            return numValue;
        } else {
            return null;
        }
    }
}
*/
