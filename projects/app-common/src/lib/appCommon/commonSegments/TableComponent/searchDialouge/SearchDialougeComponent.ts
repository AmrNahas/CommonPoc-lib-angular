import {Component, Input, OnInit} from '@angular/core';
import {UtilityController} from '../../../controllers/UtilityController';
import {ColumnTypEnum} from '../../../models/enum/ColumnTypEnum';
import {AbstractDataModelControllerV2} from "../../../controllers/AbstractDataModelControllerV2";


@Component({
    selector: 'app-filter-dialog',
    templateUrl: './SearchDialouge.component.html',
    // styleUrls: ['./filter.component.scss'],
})

export class SearchDialougeComponent extends UtilityController implements OnInit {
    @Input() public componentObject: AbstractDataModelControllerV2<any> ;
    public  ColumnTypEnum=ColumnTypEnum;
    constructor(   ) {
        super();
    }

    ngOnInit(): void {
    }






}




