import {Column} from "../../../projects/app-common/src/lib/appCommon/commonSegments/TableComponent/decorator/Column";
import {autoserializeAs} from "cerializr";
import {ColumnTypEnum} from "../../../projects/app-common/src/lib/appCommon/models/enum/ColumnTypEnum";
import {ColorEnum} from "../../../projects/app-common/src/lib/appCommon/models/enum/ColorEnum";
import {
    BadgeValueColorMap
} from "../../../projects/app-common/src/lib/appCommon/commonSegments/TableComponent/BadgeValueColorMap";
import {StatusPipe} from "../common/customePipes/pipes/statusPipe";
import {FilterOperationEnum} from "../../../projects/app-common/src/lib/appCommon/models/enum/FilterOperationEnum";
import {dropDownService} from "../app.module";
import {
    GenericFormValidators
} from "../../../projects/app-common/src/lib/appCommon/customFormValidators/GenericFormValidators";

export class EmployeeModel {

    @autoserializeAs(Number)
    @Column({
        key: "empId",
        canSort: true,
        label: "USERS.id",
        columnType: ColumnTypEnum.TEXT,
         searchable: true,
        operation: FilterOperationEnum.EQUAL,
         inputValidators:[GenericFormValidators.numeric],
        availableSearchOps:[FilterOperationEnum.EQUAL,FilterOperationEnum.MATCH,FilterOperationEnum.NOT_EQUAL,FilterOperationEnum.GREATER_THAN_EQUAL,FilterOperationEnum.LESS_THAN_EQUAL]
    })
    empId: number


    @autoserializeAs(String)
    @Column({
        key: "firstName",
        columnType: ColumnTypEnum.TEXT,
        canSort: true,
        label: "registration.firstName",
        hasBadge: false,
        searchable: true,
        operation: FilterOperationEnum.MATCH,
        availableSearchOps:[FilterOperationEnum.EQUAL,FilterOperationEnum.MATCH]

    })
    firstName: string;


    @autoserializeAs(String)
    @Column({
        key: "lastName",
        canSort: true,
        label: "registration.lastName",
        hasBadge: false,
        columnType: ColumnTypEnum.TEXT,
        lang: "en",
        searchable: true,
        operation: FilterOperationEnum.MATCH,
        availableSearchOps:[FilterOperationEnum.EQUAL,FilterOperationEnum.MATCH]
    })
    lastName: String;


    @autoserializeAs(String)
    @Column({
        key: "email",
        canSort: true,
        label: "registration.email",
        hasBadge: false,
        columnType: ColumnTypEnum.TEXT,
        searchable: true,
        operation: FilterOperationEnum.MATCH,
        availableSearchOps:[FilterOperationEnum.EQUAL,FilterOperationEnum.MATCH]
    })
    email: String;
    @autoserializeAs(String)
    @Column({
        key: "identityNum",
        canSort: true,
        label: "registration.identityNum",
        hasBadge: false,
        columnType: ColumnTypEnum.TEXT,
        searchable: true,
        operation: FilterOperationEnum.EQUAL,
        // inputValidators:[GenericFormValidators.KsaPhoneValidator],
        availableSearchOps:[FilterOperationEnum.EQUAL,FilterOperationEnum.MATCH,FilterOperationEnum.NOT_EQUAL]
    })
    identityNum: String;


    @autoserializeAs(String)
    @Column({
        key: "cntryId",
        canSort: true,
        label: "registration.country",
        hasBadge: false,
        columnType: ColumnTypEnum.DROPDOWN, searchable: true,
        operation: FilterOperationEnum.EQUAL,
        dropDownOptions: dropDownService.getAllCountriesDropDownValues()

    })
    cntryId: String;


    /*    @autoserializeAs(String)
        @Column({
            key: "cityId",
            canSort: false, label: "registration.city", hasBadge: false, columnType: ColumnTypEnum.DROPDOWN
        })
        cityId: String;*/


    @autoserializeAs(Number)
    @Column({
        key: "status",
        canSort: true, label: "USERS.status", hasBadge: true,
        columnType: ColumnTypEnum.DROPDOWN,
        pipeTransformation: new StatusPipe(),
        searchable: true,
        operation: FilterOperationEnum.EQUAL,
        badgeColorsMap: [new BadgeValueColorMap(1, ColorEnum.PRIMARY), new BadgeValueColorMap(2, ColorEnum.WARN), new BadgeValueColorMap(0, ColorEnum.ACCENT)],
        dropDownOptions: dropDownService.loadStatusListBits()
    })
    status: number;

    file: any;
    file2: any;

    @autoserializeAs(Number)
    @Column({
        key: "hijriDate", searchable: true,
        canSort: false, label: "registration.birthDay", hasBadge: false, columnType: ColumnTypEnum.DATE_Hij,
        operation: FilterOperationEnum.EQUAL,
        availableSearchOps:[FilterOperationEnum.EQUAL,FilterOperationEnum.MATCH,FilterOperationEnum.NOT_EQUAL]

    })
    hijriDate: number


    /*   hijriDateObj:NgbDateStruct*/

    getStatusStr() {
        if (this.status) {
            return this.status == 0 ? 'GENERIC.status.active' : 'GENERIC.status.inActive';
        }
    }


}
 

