

export class ResponseDataModel<T> {
      content:Array<T>;
      numberOfRecords: number;
      pageIndex:number  //  offset=(pageIndex*pageSize)
      pageSize:number;  // limit

}
 

