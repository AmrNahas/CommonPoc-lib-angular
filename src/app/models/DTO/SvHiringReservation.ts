import {Vehicles} from "../spServices/Vehicles";
import {SvHiringResvPricesListDet} from "./SvHiringResvPricesListDet";

export class SvHiringReservation {

    id: number;
    reservationNumber: number;
    vehicleId: number;
    startDate: number;
    startDateD: number;
    fromHour: number;
    toHour: number;
    hoursNumber: number;
    numberOfPersons: number;
    vehicleHourFees: number;
    spOrgId: number;
    executionStatus: number;
    totalPrice: number;
    customerId: number;
    statusStr: string;
    statusColor: string;
    executeStatusStr: string;
    executeStatusColor: string;
    orgName: string;
    reservationRefNumber: string;
    vehicleInfo: Vehicles;
    priceDetList: Array<SvHiringResvPricesListDet>;
    customerName: string;

}
