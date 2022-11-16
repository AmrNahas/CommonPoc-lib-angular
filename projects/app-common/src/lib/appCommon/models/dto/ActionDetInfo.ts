export class ActionDetInfo {
    constructor(name, color: string, icon: string, f: Function) {
        this.color = color;
        this.function = f;
        this.name = name;
        this.icon = icon;
    }

    function: Function;
    name: number;
    color: string;
    icon: string;

}