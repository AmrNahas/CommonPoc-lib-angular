import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HigriDateMask} from './directives/HigriDateMask';
import {TestDirective} from './directives/TestDirective';
import {HasPermDirective} from './directives/HasPermDirective';


@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        HigriDateMask,
        TestDirective,
        HasPermDirective,
    ],
    exports: [
        HigriDateMask,
        TestDirective,
        HasPermDirective,
    ]
})
export class CustomDirectivesModule { }
