import {Injectable, Type} from '@angular/core';


import {AppInjector} from "../app.module";
import {AppSettings} from "../app.settings";
import {
    AbstractDataModelControllerV2
} from "../../../projects/app-common/src/lib/appCommon/controllers/AbstractDataModelControllerV2";
import {
    AbstractDataModelServiceV2
} from "../../../projects/app-common/src/lib/appCommon/services/AbstractDataModelServiceV2";


@Injectable({
    providedIn: 'root'
})

export abstract class AbstractDataModelWrapperServiceV2<T> extends AbstractDataModelControllerV2<T>  {

    protected constructor(public service: AbstractDataModelServiceV2<T>, public appSettings: AppSettings, t: Type<T> ) {
        super(service,AppInjector,t );
    }



}
