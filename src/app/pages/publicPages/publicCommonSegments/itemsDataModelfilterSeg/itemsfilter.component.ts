import {Component, Input, OnInit} from '@angular/core';
import {UtilityController} from "../../../../appCommon/controllers/UtilityController";
import {ColumnTypEnum} from "../../../../appCommon/models/enum/ColumnTypEnum";
import {AbstractDataModelContrlPublic} from "../../AbstractDataModelContrlPublic";



@Component({
    selector: 'app-itemsfilter-form',
    templateUrl: './itemsfilter.component.html',
    styleUrls: ['./itemsfilter.component.scss'],
})

export class ItemsfilterComponent extends UtilityController implements OnInit {
    @Input() public componentObject: AbstractDataModelContrlPublic<any> ;
    public  ColumnTypEnum=ColumnTypEnum;
    constructor(   ) {
        super();
    }

    ngOnInit(): void {
    }






}




