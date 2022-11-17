import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HijriFormatPipe} from './pipes/HijriFormatPipe';
import {ImagePipe} from './pipes/imagePipe';
import {ImagePdfPipe} from "./pipes/imagePdfPipe";
import {ImageSvPipe} from "./pipes/imageSvPipe";
import {VeichlePicPipe} from "./pipes/VeichlePicPipe";
import {HoursPipe} from "./pipes/HoursPipe";
import {StatusPipe} from "./pipes/statusPipe";


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
        HoursPipe,
        StatusPipe
    ],
    exports: [
        HijriFormatPipe,
        ImagePipe,
        ImagePdfPipe,
        ImageSvPipe,
        VeichlePicPipe,
        HoursPipe,
        StatusPipe
    ]
})
export class CustomPipesModule { }
