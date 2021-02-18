import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HijriFormatPipe} from './pipes/HijriFormatPipe';
import {ImagePipe} from './pipes/imagePipe';
import {ImagePdfPipe} from "./pipes/imagePdfPipe";
import {ImageSvPipe} from "./pipes/imageSvPipe";
import {VeichlePicPipe} from "./pipes/VeichlePicPipe";
import {HoursPipe} from "./pipes/HoursPipe";


@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
    HijriFormatPipe,
        ImagePipe,
        ImagePdfPipe,
        ImageSvPipe,
        VeichlePicPipe,
        HoursPipe
    ],
    exports: [
        HijriFormatPipe,
        ImagePipe,
        ImagePdfPipe,
        ImageSvPipe,
        VeichlePicPipe,
        HoursPipe
    ]
})
export class CustomPipesModule { }
