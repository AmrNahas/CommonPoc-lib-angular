import {JsonArray} from "@angular/compiler-cli/ngcc/src/packages/entry_point";


export class ResponseDataModel2<T> {
      content:JsonArray;
      numberOfRecords: number;
      pageIndex:number  //  offset=(pageIndex*pageSize)
      pageSize:number;  // limit

}
 

