import {SortDirection} from '@angular/material/sort';

export class SortCriteria {
    public  propertyName:string;
    public  sortOrder:string;
    constructor(propertyName: string, sortOrder: SortDirection) {
        this.propertyName = propertyName;
        this.sortOrder=sortOrder;
    }

}
