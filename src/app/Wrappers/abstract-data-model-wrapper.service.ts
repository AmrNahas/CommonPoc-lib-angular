import {Injectable, OnDestroy} from '@angular/core';



import {AppInjector} from "../app.module";
import {AppSettings} from "../app.settings";
import {AbstractDataModelController, AbstractDataModelService} from "../../../dist/app-common";


@Injectable({
    providedIn: 'root'
})

export abstract class AbstractDataModelWrapper<T> extends AbstractDataModelController<T>  {

    protected constructor(public service: AbstractDataModelService<T>, public appSettings: AppSettings) {
        super(service,AppInjector);
    }



}
