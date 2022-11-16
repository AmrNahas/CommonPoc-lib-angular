import {FilterCriteria} from './FilterCriteria';
import {SortCriteria} from './SortCriteria';

export class InputDataModel  {
           filterList: Array<FilterCriteria> ; // the filter list for specifications
           limit :number;    // limit
           offset:number;  //  offset
           sortCriteria: SortCriteria ; // the filter list for specifications
          sortCriteriaList: Array<SortCriteria> ; // the filter list for specifications

  /*  constructor(filterList: Array<FilterCriteria>, limit: number, offset: number,sortCriteria:SortCriteria) {
        this.filterList = filterList;
        this.limit = limit;
        this.offset = offset;
        this.sortCriteria=sortCriteria
    }*/

    constructor(filterList: Array<FilterCriteria>, limit: number, offset: number,sortCriteria:SortCriteria,sortCriteriaList:Array<SortCriteria>) {
        this.filterList = filterList;
        this.limit = limit;
        this.offset = offset;
        this.sortCriteria=sortCriteria;
        this.sortCriteriaList=sortCriteriaList;
    }
}
