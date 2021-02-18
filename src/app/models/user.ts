import {City} from './city';
import {Country} from './country';

export class User {
    id: number;
    firstName: string;
    middleName: String;
    lastName: String;
    email: String;
    identityNum: String;
    userName: string;
    password: string;
    age: number;
    phoneNumber: string;
    address: string;
    cityId: number;
    cntryId: number;
    partyId: number;
    status: number;
    repName: string;
    city: City;
    country: Country;
    statusStr: String;
    masterUserFlag:number;

   getStatusStr() {
        if (this.status) {
            return this.status == 0 ? 'GENERIC.status.active' : 'GENERIC.status.inActive';
        }

    }
}
 

