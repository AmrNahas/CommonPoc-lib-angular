import {Component, Input, OnInit} from "@angular/core";
import {cloneDeep, orderBy, sortBy} from "lodash";
import {Sort, SortDirection} from "@angular/material/sort";
import {TableModel} from "./decorator/TableModel";
import {tableSymbol} from "./decorator/Column";
import {ColumnModel} from "./decorator/ColumnModel";
import {AbstractDataModelControllerV2} from "../../controllers/AbstractDataModelControllerV2";

export class ActionDetInfo{
   type:number;
   color:string;
}

@Component({
    selector: "app-table",
    templateUrl: "./table.component.html",
    styleUrls: ["./table.component.scss"],
})
export class TableComponent   implements OnInit {
   public loadData: boolean;
    private _data = [];
    @Input()   obj: AbstractDataModelControllerV2<any> ;
    private _originalData: any[] = [];
    private _tableModel: TableModel;
    @Input() hasActions:boolean;
    @Input()   actionDetails:ActionDetInfo[];
    @Input() set data(values: any[]) {
            this._data = cloneDeep(values);
            this._tableModel = this._data[0][tableSymbol];
            this.buildColumns();
            if (!this._originalData.length) {
                // Keep original order of data
                this._originalData = cloneDeep(this._data);
            }
    }
    get data(): any[] {
        return this._data;
    }
    @Input() instance: any;

    columns: ColumnModel[];
    displayedColumns: string[];
    actionColum: ColumnModel ;

    constructor() {

    }

    ngOnInit() {
        this.buildColumns();
    }

    sortData(params: Sort) {
        const direction: SortDirection = params.direction;
        this.data = direction
            ? orderBy(this.data, [params.active], [direction])
            : this._originalData;
    }

    private buildColumns() {
        this.columns = this._tableModel.columns
        this.sortColumns();
        if(this.actionDetails&&this.actionDetails.length>0 ) {
            this.actionColum =new ColumnModel(
            {    key: "actions",
                canSort: true,label: "GENERIC.actions" ,hasBadge:false  }
        );
            this.columns.push(this.actionColum)
        }

        this.displayedColumns = this.columns.map(col => col.key);

    }


    private sortColumns() {
        this.columns = sortBy(this.columns, ["order"]);
    }

 /*   view(obj:Employee) {
        console.log(obj.empId)
    }

    edit(obj:Employee) {
        console.log(obj.empId)
    }

    delete(obj:Employee) {
        console.log(obj.empId)
    }*/

}
