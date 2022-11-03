export class ColumnModel {
    /** List of options */
    key: string;
    label: string;
    order: number;
    propertyType: any;
    canSort: boolean;
    hasBadge: boolean;
    badgeClass: string;

    constructor(options: Partial<ColumnModel> = {}) {
        this.key = options.key;
        this.order = options.order || 0;
        this.propertyType = options.propertyType;
        this.canSort = options.canSort || false;
        this.label = options.label ||options.key
        this.hasBadge = options.hasBadge ||false
        this.badgeClass = options.badgeClass ||"primary"
    }
}
