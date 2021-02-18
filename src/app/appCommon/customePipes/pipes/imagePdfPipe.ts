import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'imagePdfPipe'})
export class ImagePdfPipe implements PipeTransform {
    transform(value: string): string {
        let strValue = '';
        if (value) {
            strValue = value;
        } else {
            strValue = '../assets/img/pipes/pdf.png';
        }

        return strValue;
    }
}
