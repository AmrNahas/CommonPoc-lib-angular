import {Column} from "../../../projects/app-common/src/lib/appCommon/commonSegments/TableComponent/decorator/Column";
import {autoserializeAs} from "cerializr";

/*import {NgbDateStruct} from NgbDateStruct;*/

export class Employee {
    @autoserializeAs(Number)
    @Column({
        key: "empId",
        canSort: true, label: "USERS.id"
    })
    empId: number
    @autoserializeAs(String)
    @Column({    key: "firstName",
        canSort: true,label: "registration.firstName" ,hasBadge:true  })
    firstName: string;
    @autoserializeAs(String)
    @Column({    key: "middleName",
        canSort: true,label: "registration.firstName" ,hasBadge:true  })
    middleName: String;
    @autoserializeAs(String)
    @Column({    key: "lastName",
        canSort: true,label: "registration.birthDay" ,hasBadge:false  })
    lastName: String;
    @autoserializeAs(String)
    @Column({    key: "email",
        canSort: true,label: "registration.birthDay" ,hasBadge:false  })
    email: String;
    @autoserializeAs(String)
    @Column({    key: "identityNum",
        canSort: true,label: "registration.birthDay" ,hasBadge:false  })
    identityNum: String;
    @autoserializeAs(String)
    @Column({    key: "cntryId",
        canSort: true,label: "registration.birthDay" ,hasBadge:false  })
    cntryId: String;
    @autoserializeAs(String)
    @Column({    key: "cityId",
        canSort: true,label: "registration.birthDay" ,hasBadge:false  })
    cityId: String;
    @autoserializeAs(Number)
    @Column({    key: "status",
        canSort: true,label: "registration.birthDay" ,hasBadge:true  })
    status: number;
    /*   @autoserializeAs(Country)
       @Column()
       country: Country;
       @autoserializeAs(String,name)
       @Column()
       city: City;*/
    @autoserializeAs(String)
    @Column({    key: "phoneNum",
        canSort: true,label: "registration.birthDay" ,hasBadge:false  })
    phoneNum: string;
    file:any;
    file2:any;
    @autoserializeAs(Number)
    @Column({    key: "hijriDate",
        canSort: true,label: "registration.birthDay" ,hasBadge:false  })
    hijriDate: number


    /*   hijriDateObj:NgbDateStruct*/

    getStatusStr() {
        if (this.status) {
            return this.status == 0 ? 'GENERIC.status.active' : 'GENERIC.status.inActive';
        }
    }

}
 

