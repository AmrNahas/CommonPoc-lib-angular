export class RegiseterDto {

    name: string;
    userName: string;
    password:string


     constructor(name: string, userName: string, password: string) {
        this.name = name;
        this.userName = userName;
        this.password = password;
    }
}
