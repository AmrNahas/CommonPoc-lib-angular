export class Vehicles {
    public id: number;
    public reqId: number;
    public typeId: number;
    public countryId: number;
    public cityId: number;
    public lat: string;
    public lng: string;
    public licenseNum: string;
    public serialNum: string;
    public nameAr: string;
    public nameEn: string;
    public masterPicUrl: string;
    public spRepId: string;
    public descriptionAr: string;
    public descriptionEn: string;
    public statusStr: string;
    public statusColor: string;
    public reqStatusStr: string;
    public reqStatusColor: string;
    //transient
    public cityName: string;
    public countryName: string;
    public typeName: string;
    public repName: string;
    public reqStatus: number;
    public maxSeatsNum: number;
    public minHourForHire: number;
    public pricePerHour: number;
    public hasToiletValue: boolean;
    public hasKitchenValue: boolean;
    public hasEmergencyToolsValue: boolean;
    public hasFishingToolsValue: boolean;
    public locationAddress: string;
    public masterPicBase64: string;
    public ownerIdNo: string;
    public ownerCommRegNum: string;
    public ownerName: string;
    public ownerLocation: string;
    public ownerType: string;
    public ownerTypeId: number;
    public comments:string;

}
