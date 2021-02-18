import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'hijriFormat'})
export class HijriFormatPipe implements PipeTransform {
    transform(value: number): string {
        let strValue='';
        if (value) {
        let year = value.toString().substring(0, 4);
        let month = value.toString().substring(4, 6);
        let day = value.toString().substring(6, 8);
          strValue = day + "-" + month + "-" + year;
    }
        return strValue;
    }
}
