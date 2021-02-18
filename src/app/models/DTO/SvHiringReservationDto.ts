export class SvHiringReservationDto {
    customerId: number;
    numberOfPersons: number;
    numberOfHours: number;
    fromHour: number;
    toHour: number;
    svId: number;
    priceWithVat: number;
    vatAmount: number;
    priceWithOutVat: number;
    dateOfStartResv: number;

    constructor(customerId: number, numberOfPersons: number, numberOfHours: number, fromHour: number, toHour: number, svId: number, priceWithVat: number, vatAmount: number, priceWithOutVat: number, dateOfStartResv:number) {
        this.customerId = customerId;
        this.numberOfPersons = numberOfPersons;
        this.numberOfHours = numberOfHours;
        this.fromHour = fromHour;
        this.toHour = toHour;
        this.svId = svId;
        this.priceWithVat = priceWithVat;
        this.vatAmount = vatAmount;
        this.priceWithOutVat = priceWithOutVat;
        this.dateOfStartResv = dateOfStartResv;
    }
}
