export class AuthUser {

    id: number;
    name: string;
    userName: string;
    token: string;
    tokenExpiredTime: number;
    permissions:Array<any>;
    services:Array<any>;
    partyId:number;
    repId:number;

    constructor(id: number, name: string, userName: string,token: string,tokenExpiredTime:number,permissions:Array<number> ,repId:number) {
        this.id = id;
        this.name = name;
        this.userName = userName;
        this.token = token;
        this.tokenExpiredTime=tokenExpiredTime;
        this.permissions=permissions;
        this.repId=repId
    }
}
