import {ColorEnum} from "../../models/enum/ColorEnum";

export class BadgeValueColorMap {
    value: any;
    color: ColorEnum;


    constructor(value: any, color: ColorEnum) {
        this.value = value;
        this.color = color;
    }
}