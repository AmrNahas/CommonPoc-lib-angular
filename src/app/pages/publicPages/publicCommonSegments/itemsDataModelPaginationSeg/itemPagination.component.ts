import {Component, Input, OnInit} from '@angular/core';
import {AbstractDataModelContrlPublic} from "../../AbstractDataModelContrlPublic";


@Component({
    selector: 'app-itemsPagination',
    templateUrl: './itemsPagination.component.html',
    styleUrls: ['./itemPagination.component.scss']
})

export class ItemPaginationComponent  implements OnInit {
    @Input()  public componentObject: AbstractDataModelContrlPublic<any> ;
    constructor() {}
    ngOnInit() {
    }



}




