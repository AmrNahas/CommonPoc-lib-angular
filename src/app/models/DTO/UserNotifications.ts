export class UserNotifications {
    id: number;
    type: number;
    partyId: number;
    message: string;
    messageEn: string;
    link: string;
    messageDate: number;
    typeNameAr: string;
    typeNameEn: string;
    createdInLong: number;
    userReadStatus: number;
    recordId: number;
    statusStr: string;
    statusColor: string;

    constructor() {
        if(this.userReadStatus){
            this.statusStr=this.userReadStatus==0?"":"";
            this.statusColor=this.userReadStatus==0?"warn":"";
        }

    }
}
     

