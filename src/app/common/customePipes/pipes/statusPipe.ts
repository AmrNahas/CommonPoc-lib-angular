import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'empStatusPipe'})
export class StatusPipe implements PipeTransform {
    transform(value: number): string {
        let strValue :string='بالانتظار';
        switch (value){
            case  1:
                strValue="فعال";
                break;
            case 2:
                strValue="موقوف";
                break;
            case 0:
                strValue="بالانتظار";
                break;

        }


        return strValue;
    }
}
