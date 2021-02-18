import { User } from "../user";
import { UsersRoles } from "../usersRoles";

export class UsersRolesConjDto {

 user:User;
 uRolesConjList:UsersRoles[];
    
    constructor(user:User,
        uRolesConjList:UsersRoles[],
        ) {
        this.user = user;
        this.uRolesConjList=uRolesConjList;
        
    }
}
     

 