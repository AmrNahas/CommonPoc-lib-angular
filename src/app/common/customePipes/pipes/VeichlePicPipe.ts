import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'veichlePicPipe'})
export class VeichlePicPipe implements PipeTransform {
    transform(value: string): string {
        let strValue = '';
        if (value ) {
            strValue = value;
        } else {
            strValue = '../assets/img/pipes/jpeg.png';
        }

        return strValue;
    }
}
