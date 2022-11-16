import {UtilityController} from "../../../controllers/UtilityController";
import {Component, Input, OnInit} from "@angular/core";
import {ColumnTypEnum} from "../../../models/enum/ColumnTypEnum";
import {ColumnModel} from "../decorator/ColumnModel";
import {LocalSelectItem} from "../../../models/dto/LocalSelectItem";
import {FilterProperty} from "../../../models/dto/FilterProperty";
import {AbstractDataModelControllerV2} from "../../../controllers/AbstractDataModelControllerV2";


@Component({
    selector: 'inline-filter-column',
    templateUrl: './inlineFilter.component.html',

})

export class InlineFilterComponent extends UtilityController implements OnInit {
    @Input() public column:ColumnModel
    @Input() public obj: AbstractDataModelControllerV2<any> ;
    public  ColumnTypEnum=ColumnTypEnum;
    constructor(   ) {
        super();
    }

    ngOnInit(): void {
    }

    getOptions(key: string): LocalSelectItem[] {
        if (this.obj.filterPropertiesArr && this.obj.filterPropertiesArr.length > 0) {
            let filter: FilterProperty[] = this.obj.filterPropertiesArr.filter(item => item.columnProp == key);
            return filter[0].options;
        }
    }

    isSearchable(key: string): boolean {
        if (this.obj.filterPropertiesArr && this.obj.filterPropertiesArr.length > 0) {
            let filter: FilterProperty[] = this.obj.filterPropertiesArr.filter(item => item.columnProp == key);
            return filter.length > 0;
        }
        return false;
    }


    stopPropagation($event: any) {
        if ($event) $event.stopPropagation();
    }

}