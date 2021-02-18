import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'imageSvPipe'})
export class ImageSvPipe implements PipeTransform {
    transform(value: string): string {
        let strValue = '';
        if (value) {
            strValue = value;
        } else {
            strValue = '../assets/img/pipes/jpeg.png';
        }

        return strValue;
    }
}
