import {LocalSelectItem} from './LocalSelectItem';
import {Observable, ReplaySubject, Subject} from 'rxjs';
import {FormControl, ValidatorFn} from '@angular/forms';
import {ColumnTypEnum} from '../enum/ColumnTypEnum';
import {FilterOperationEnum} from '../enum/FilterOperationEnum';
import {OnInit} from '@angular/core';
import {takeUntil} from 'rxjs/operators';


export class FilterProperty {
    public localName: string;
    public columnProp: string;
    public columnType: ColumnTypEnum;
    public observableLocalItems:any //Observable<Array<LocalSelectItem>>; // may be  observable object to subscribe on run time or []
    public options: LocalSelectItem[];
    public value :any;
    public operation :FilterOperationEnum
    public inputValidators :ValidatorFn[]
   /* public inputType :string*/
    constructor(localName: string, columnProp: string, columnType: number, operation: FilterOperationEnum, observableLocalItems: any, inputValidators: ValidatorFn[]) {
        this.localName = localName;
        this.columnProp = columnProp;
        this.columnType = columnType;
        this.operation = operation;
        this.inputValidators=inputValidators;
        this.observableLocalItems=observableLocalItems;
        if(observableLocalItems && observableLocalItems instanceof Observable)
            this.fillOptions(observableLocalItems);

        else
            this.options=this.observableLocalItems;
    }

    // used to fill options for select item if its type is dropDown
    fillOptions(observableArray: Observable<Array<LocalSelectItem>>){
        this.observableLocalItems.subscribe ((data: LocalSelectItem[])=>{
            this.options=data;
        });


    }

/*
    protected filter() {
        if (!this.options) {
            console.log('no values')
            return;
        }
        // get the search keyword
        let search = this.formControl.value;
        if (!search) {
            this.filterSubject.next(this.options.slice());
            return;
        } else {
            search = search.toLowerCase();
        }
        // filter the banks
        this.filterSubject.next(
            this.options.filter(item => item.nameEn.toLowerCase().indexOf(search) > -1)
        );
    }
*/



}
