import {ActionDetInfo} from "./ActionDetInfo";
import {ActionRenderTypeEnum} from "../enum/ActionRenderTypeEnum";

export class TableProperties {

    constructor(tableName: string, tableId: any, localCardTitle: string, exportable?: boolean, showSearchCriteriaBadges?: boolean, recordActionRenderType?: ActionRenderTypeEnum, recordsActionsList?: ActionDetInfo[], tableActions?: Array<ActionDetInfo>) {
        this.tableName = tableName;
        this.tableId = tableId;
        this.localCardTitle = localCardTitle;
        this.exportable = exportable||false;
        this.showSearchCriteriaBadges = showSearchCriteriaBadges||false;
        this.recordActionRenderType = recordActionRenderType||ActionRenderTypeEnum.TOGGLE;
        this.recordsActionsList = recordsActionsList||[];
        this.tableActions = tableActions||[];
    }

    tableName: string;
    tableId: any;
    localCardTitle: string;
    exportable:boolean;
    showSearchCriteriaBadges:boolean;
    recordActionRenderType: ActionRenderTypeEnum;
    recordsActionsList:ActionDetInfo[];
    tableActions: Array<ActionDetInfo>;



}