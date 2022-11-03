import {Component, Input, OnInit} from '@angular/core';
import {AbstractDataModelControllerV2} from "../../controllers/AbstractDataModelControllerV2";


@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss']
})

export class Pagination  implements OnInit {
    @Input()  public componentObject: AbstractDataModelControllerV2<any> ;
    constructor() {}
    ngOnInit() {
    }



}




