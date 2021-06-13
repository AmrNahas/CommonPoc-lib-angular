import {Component, OnInit, Input, OnChanges, SimpleChanges} from '@angular/core';
import {AbstractDataModelController} from '../../controllers/AbstractDataModelController';


@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss']
})

export class Pagination  implements OnInit {
    @Input()  public componentObject: AbstractDataModelController<any> ;
    constructor() {}
    ngOnInit() {
    }



}




