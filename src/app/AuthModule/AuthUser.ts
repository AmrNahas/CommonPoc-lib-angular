export class AuthUser {

    id: number;
    name: string;
    userName: string;
    token: string;
    tokenExpiredTime: number;
    permissions:Array<any>;
    services:Array<any>;
    typeId:number;

    constructor(id: number, name: string, userName: string,token: string,tokenExpiredTime:number,permissions:Array<number> ) {
        this.id = id;
        this.name = name;
        this.userName = userName;
        this.token = token;
        this.tokenExpiredTime=tokenExpiredTime;
        this.permissions=permissions;
    }
}
