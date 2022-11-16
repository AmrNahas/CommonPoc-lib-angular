import {Column} from "../../../projects/app-common/src/lib/appCommon/commonSegments/TableComponent/decorator/Column";
import {autoserializeAs} from "cerializr";
import {ColumnTypEnum} from "../../../projects/app-common/src/lib/appCommon/models/enum/ColumnTypEnum";
import {ColorEnum} from "../../../projects/app-common/src/lib/appCommon/models/enum/ColorEnum";
import {
    BadgeValueColorMap
} from "../../../projects/app-common/src/lib/appCommon/commonSegments/TableComponent/BadgeValueColorMap";

export class EmployeeModel   {

    @autoserializeAs(Number)
    @Column({
        key: "empId",
        canSort: true,
        label: "USERS.id",
        columnType: ColumnTypEnum.TEXT,
        lang:"ar"
    })
    empId: number


    @autoserializeAs(String)
    @Column({
        key: "firstName", columnType: ColumnTypEnum.TEXT,
        canSort: true, label: "registration.firstName", hasBadge: false,
    })
    firstName: string;


    @autoserializeAs(String)
    @Column({
        key: "lastName",
        canSort: true, label: "registration.lastName", hasBadge: false, columnType: ColumnTypEnum.TEXT,  lang:"en"
    })
    lastName: String;



    @autoserializeAs(String)
    @Column({
        key: "email",
        canSort: true, label: "registration.email", hasBadge: false, columnType: ColumnTypEnum.TEXT
    })
    email: String;
    @autoserializeAs(String)
    @Column({
        key: "identityNum",
        canSort: true, label: "registration.identityNum", hasBadge: false, columnType: ColumnTypEnum.TEXT
    })
    identityNum: String;


    @autoserializeAs(String)
    @Column({
        key: "cntryId",
        canSort: true,
        label: "registration.country",
        hasBadge: false,
        columnType: ColumnTypEnum.DROPDOWN,

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
        badgeColorsMap:[new BadgeValueColorMap(0,ColorEnum.PRIMARY),new BadgeValueColorMap(1,ColorEnum.WARN),new BadgeValueColorMap(2,ColorEnum.ACCENT)]
    })
    status: number;

    file: any;
    file2: any;

    @autoserializeAs(Number)
    @Column({
        key: "hijriDate",
        canSort: false, label: "registration.birthDay", hasBadge: false, columnType: ColumnTypEnum.DATE_Hij,

    })
    hijriDate: number


    /*   hijriDateObj:NgbDateStruct*/

    getStatusStr() {
        if (this.status) {
            return this.status == 0 ? 'GENERIC.status.active' : 'GENERIC.status.inActive';
        }
    }


}
 

