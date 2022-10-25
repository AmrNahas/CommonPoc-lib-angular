import {Injectable} from '@angular/core';


import {AppInjector} from "../app.module";
import {AppSettings} from "../app.settings";
import {
    AbstractDataModelController
} from "../../../projects/app-common/src/lib/appCommon/controllers/AbstractDataModelController";
import {
    AbstractDataModelService
} from "../../../projects/app-common/src/lib/appCommon/services/AbstractDataModelService";


@Injectable({
    providedIn: 'root'
})

export abstract class AbstractDataModelWrapper<T> extends AbstractDataModelController<T>  {

    protected constructor(public service: AbstractDataModelService<T>, public appSettings: AppSettings) {
        super(service,AppInjector);
    }



}
