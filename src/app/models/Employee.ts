import {City} from "./city";


/*import {NgbDateStruct} from NgbDateStruct;*/

export class ParentObject {

}

export class Employee extends ParentObject {
    empId: number
    firstName: string;
    middleName: String;
    lastName: String;
    email: String;
    identityNum: String;
    cntryId: String;
    cityId: String;
    status: number;
    city: City;
    phoneNum: string;
    file: any;
    file2: any;
    hijriDate: number


    /*   hijriDateObj:NgbDateStruct*/

    getStatusStr() {
        if (this.status) {
            return this.status == 0 ? 'GENERIC.status.active' : 'GENERIC.status.inActive';
        }
    }


}
 

