import {NgModule} from '@angular/core';
import {AppCommonComponent} from './app-common.component';
import {HijriFormatFromNgStructPipe} from "./appCommon/hijri-gregorian-datepicker/HijriFormatFromNgStructPipe";


/*
   //injector   global variable    >>  you can import it and use all over app
export let AppInjector: Injector;*/

@NgModule({
  declarations: [AppCommonComponent],
  imports: [
  ],
  exports: [AppCommonComponent
  ],
  providers: [HijriFormatFromNgStructPipe,
    //hijri data providers
   /* { provide: NgbCalendar, useClass: NgbCalendarIslamicUmalqura },
    { provide: NgbDatepickerI18n, useClass: IslamicI18n },
*/
  ],
})
export class AppCommonModule {
}
