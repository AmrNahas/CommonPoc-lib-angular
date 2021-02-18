import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'imagePipe'})
export class ImagePipe implements PipeTransform {
    transform(value: string): string {
        let strValue = '';
        if (value) {
            strValue = value;
        } else {
            strValue = '../assets/img/users/default-user.jpg';
        }

        return strValue;
    }
}
