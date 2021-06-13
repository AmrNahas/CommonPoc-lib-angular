import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'hoursPipe'})
export class HoursPipe implements PipeTransform {
    transform(value: number): string {
        let strValue :string='';
        if (value )
            strValue = value > 12 ? value- 12 + ":00  " + "مساءا " : value + ":00 " + " صباحا ";

        return strValue;
    }
}
