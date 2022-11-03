import {ColumnModel} from "./ColumnModel";

export class TableModel {
    columns: ColumnModel[] = [];

    addColumn(column: ColumnModel) {
        this.columns = [...this.columns, column];
    }
}
