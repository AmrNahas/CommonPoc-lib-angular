import {FilterOperationEnum} from "../../../models/enum/FilterOperationEnum";
import {ValidatorFn} from "@angular/forms";
import {BadgeValueColorMap} from "../BadgeValueColorMap";
import {PipeTransform} from "@angular/core";
import {LocalSelectItem} from "../../../models/dto/LocalSelectItem";
import {Observable, of} from "rxjs";

export class ColumnModel {
    /** List of options */
    key: string;
    label: string;
    order: number;
    propertyType: any;
    canSort: boolean;
    hasBadge: boolean;
    columnProp: string;
    columnType: number;
    operation: FilterOperationEnum;
    observableLocalItems: any;
    inputValidators: ValidatorFn[];
    badgeColorsMap: Array<BadgeValueColorMap>
    pipeTransformation: PipeTransform
    lang: string
    searchable: boolean;
    dropDownOptions: Observable<LocalSelectItem[]> ;
    availableSearchOps: FilterOperationEnum[] ;


    constructor(options: Partial<ColumnModel> = {}) {
        this.key = options.key;
        this.order = options.order || 0;
        this.propertyType = options.propertyType;
        this.canSort = options.canSort || false;
        this.label = options.label || options.key
        this.hasBadge = options.hasBadge || false
        this.columnProp = options.columnProp;
        this.columnType = options.columnType
        this.operation = options.operation;
        this.observableLocalItems = options.observableLocalItems;
        this.inputValidators = options.inputValidators;
        this.badgeColorsMap = options.badgeColorsMap || [];
        this.pipeTransformation = options.pipeTransformation || null;
        this.lang = options.lang || null;
        this.searchable=options.searchable || false;
        this.dropDownOptions=options.dropDownOptions||of([]);
        this.availableSearchOps=options.availableSearchOps  || [] ;
    }
}
