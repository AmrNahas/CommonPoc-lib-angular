import {Component, Input, OnChanges, OnInit, ViewChild} from "@angular/core";
import {cloneDeep, sortBy} from "lodash";
import {TableModel} from "./decorator/TableModel";
import {tableSymbol} from "./decorator/Column";
import {ColumnModel} from "./decorator/ColumnModel";
import {AbstractDataModelControllerV2} from "../../controllers/AbstractDataModelControllerV2";
import {ColumnTypEnum} from "../../models/enum/ColumnTypEnum";
import {MatTable} from "@angular/material/table";
import {FilterProperty} from "../../models/dto/FilterProperty";
import {LocalSelectItem} from "../../models/dto/LocalSelectItem";
import {BadgeValueColorMap} from "./BadgeValueColorMap";
import {ColorEnum} from "../../models/enum/ColorEnum";
import {ActionsInfo} from "../../models/dto/ActionsInfo";
import {ActionRenderTypeEnum} from "../../models/enum/ActionRenderTypeEnum";


@Component({
    selector: "app-table",
    templateUrl: "./table.component.html",
    styleUrls: ["./Table.component.scss"],
})
export class TableComponent implements OnInit, OnChanges {
    public ColumnTypEnum = ColumnTypEnum;
    public ActionRenderTypeEnum = ActionRenderTypeEnum;
    private _data = [];
    @ViewChild(MatTable) table: MatTable<any>;
    public empty: boolean;
    @Input() obj: AbstractDataModelControllerV2<any>;
    private _originalData: any[] = [];
    private _tableModel: TableModel;
    @Input() hasActions: boolean;
    @Input() actionsInfo: ActionsInfo;
    @Input() dummyValue: any;
    columns: ColumnModel[];
    displayedColumns: string[];
    actionColum: ColumnModel;
    rendering: boolean;
    dataSetFlag: boolean;
    selectedUser: any;



    constructor() {

    }


    @Input() set data(values: any[]) {
        this.dataSetFlag = true;
        this.rendering = true;
        if (!values || values.length == 0) {
            this.empty = true;
            values = [];
        } else {
            this.empty = false;
        }
        this._data = cloneDeep(values);
        this._tableModel = this._data && this._data.length > 0 ? this._data[0][tableSymbol] : this.dummyValue[tableSymbol];
        this.buildColumns();

        if (!this._originalData.length && this._originalData[0] != null) {
            // Keep original order of data
            this._originalData = cloneDeep(this._data);
        }
        this.rendering = false;
    }

    get data(): any[] {
        return this._data;
    }


    ngOnInit() {
        this.rendering = true;
/*        window.addEventListener('keydown', function(e) {
            if(e.keyCode == 32 && e.target == document.body) {
                console.log(e.key)
                e.preventDefault();
            }
        });*/

       this.disableF5Event()
    }






    disableF5Event() {
        window.addEventListener('keyup', disableF5);
        window.addEventListener('keydown', disableF5);

        function disableF5(e) {
            if ((e.which || e.key) == 116) {
                e.preventDefault();
            }
        }
    }


    ngOnChanges() {
        this.dataSetFlag = false;
    }

    private buildColumns() {
        if (this._tableModel) {
            let columnsList: ColumnModel[] = this._tableModel.columns
            this.columns = columnsList.filter(item => item.lang == null || item.lang == this.getCurrentLang());
            this.sortColumns();
            if (this.actionsInfo && this.actionsInfo.actions.length > 0) {
                this.actionColum = new ColumnModel(
                    {
                        key: "actions",
                        label: "GENERIC.actions"
                    }
                );
                this.columns.push(this.actionColum)
            }

            this.displayedColumns = this.columns.map(col => col.key);
        }

    }


    private sortColumns() {
        this.columns = sortBy(this.columns, ["order"]);
    }


    stopPropagation($event: any) {
        $event.stopPropagation();
       // if ($event) $event.stopPropagation();
    }


    loadData($event: Event) {
        console.log("type>>", $event.type)

    }


    getOptions(key: string): LocalSelectItem[] {
        if (this.obj.filterPropertiesArr && this.obj.filterPropertiesArr.length > 0) {
            let filter: FilterProperty[] = this.obj.filterPropertiesArr.filter(item => item.columnProp == key);
            return filter[0].options;
        }
    }

    isSearchable(key: string): boolean {
        if (this.obj.filterPropertiesArr && this.obj.filterPropertiesArr.length > 0) {
            let filter: FilterProperty[] = this.obj.filterPropertiesArr.filter(item => item.columnProp == key);
            return filter.length > 0;
        }
        return false;
    }


    getColorForBadge(badgeColorsMap: Array<BadgeValueColorMap>, value: any) {
        try {
            if (badgeColorsMap && badgeColorsMap.length > 0 && value != null)
                return badgeColorsMap.filter(item => item.value == value)[0].color
            else {
                return ColorEnum.DEFAULT;
            }
        } catch (e) {
            return ColorEnum.DEFAULT;
        }
    }


    transformData(value: any, column: ColumnModel) {
        try {
            if (column.pipeTransformation)
                return column.pipeTransformation.transform(value);
            else
                return value
        } catch (e) {
            return value
        }

    }


    getCurrentLang() {
        let lang = localStorage.getItem('lang');
        return lang ? lang : "ar";
    }


    test() {
        console.log("space action  down")
    }

    toggle($event: Event) {
        console.log("Toggle", $event)
    }
}

