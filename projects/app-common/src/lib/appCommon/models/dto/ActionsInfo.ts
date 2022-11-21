import {ActionDetInfo} from "./ActionDetInfo";
import {ActionRenderTypeEnum} from "../enum/ActionRenderTypeEnum";


export class ActionsInfo {
    constructor(type: ActionRenderTypeEnum, actions: Array<ActionDetInfo>) {
        this.type = type;
        this.actions = actions
    }
    type: ActionRenderTypeEnum;
    actions: Array<ActionDetInfo>;


}