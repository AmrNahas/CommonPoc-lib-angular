import { User } from "../user";
import {AuthUser} from '../../AuthModule/AuthUser';

  
 

export class UserPhotoDTO {

 user:AuthUser;
 userPhotoFile:File;
 userPhotoBArr:any;

    
    constructor(user:AuthUser,photo:File ) {
       
        this.user = user;
        this.userPhotoFile=photo;
        
    }
}
     

