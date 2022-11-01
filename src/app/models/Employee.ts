/*import {NgbDateStruct} from NgbDateStruct;*/

import {Country} from "./country";
import {City} from "./city";

export class Employee {
    empId: number;
    firstName: string;
    middleName: String;
    lastName: String;
    email: String;
    identityNum: String;
    cntryId: String;
    cityId: String;
    status: number;
    country:Country;
    city:City;
    phoneNum:string;
    file:any;
    file2:any;
    hijriDate:number
 /*   hijriDateObj:NgbDateStruct*/

   getStatusStr() {
        if (this.status) {
            return this.status == 0 ? 'GENERIC.status.active' : 'GENERIC.status.inActive';
        }
    }

}
 

