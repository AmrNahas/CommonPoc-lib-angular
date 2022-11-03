import "reflect-metadata";
import {TableModel} from "./TableModel";
import {ColumnModel} from "./ColumnModel";

export const tableSymbol = Symbol("column");

export function Column(options: Partial<ColumnModel> = {}) {
    return function(target: any, propertyKey: string) {
       // console.log('decorator column for', propertyKey);
        if (!target[tableSymbol]) {
            target[tableSymbol] = new TableModel();
        }
        options.key = options.key || propertyKey;
        const propType = Reflect.getMetadata("design:type", target, propertyKey);
        options.propertyType = propType.name;
        const columnOptions = new ColumnModel(options);
        target[tableSymbol].addColumn(columnOptions);
    };
}
