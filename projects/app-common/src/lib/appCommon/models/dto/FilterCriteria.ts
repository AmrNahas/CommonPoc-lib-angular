export class FilterCriteria {
    public  propertyName:string;
    public operation:string;
    public propertyValue:any;

    constructor(propertyName: string, propertyValue: any, operation: string) {
        this.propertyName = propertyName;
        this.propertyValue = propertyValue;
        this.operation=operation;
    }
}
