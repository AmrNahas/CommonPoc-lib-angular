import {NgModule} from '@angular/core';
import {AppCommonComponent} from './app-common.component';


/*
   //injector   global variable    >>  you can import it and use all over app
export let AppInjector: Injector;*/

@NgModule({
  declarations: [AppCommonComponent],
  imports: [
  ],
  exports: [AppCommonComponent,
  ],
  providers: [
  ],
})
export class AppCommonModule {
}
