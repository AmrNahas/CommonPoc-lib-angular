import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {UsersService} from 'src/app/services/usersServices/users.service';
import {AuthService} from '../../../AuthModule/AuthService';
import {AuthUser} from '../../../AuthModule/AuthUser';
import {EncryptDecrypt} from "../../../appCommon/utility/EncryptDecrypt";
import {PartiesEnum} from "../../../models/utilites/PartiesEnum";

@Component({
    selector: 'app-user-menu',
    templateUrl: './user-menu.component.html',
    styleUrls: ['./user-menu.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class UserMenuComponent implements OnInit {
    public userImage = '../assets/img/users/user.jpg';
    imageBlobUrl: any;
    authUser: AuthUser;
    public userLoggedIn: boolean;
    public partyName: string;
    public partyId: number;

    constructor(private router: Router, public authService: AuthService, public userService: UsersService) {
        this.authUser = authService.currentUserValue
        this.userLoggedIn = authService.validateToken();
        this.partyId = EncryptDecrypt.decrypt(localStorage.getItem('sec_sess_pt'));
    }


    ngOnInit() {
        if (this.partyId) {
            if (this.partyId == PartiesEnum.SERVICE_PROVIDER)
                this.partyName = "GENERIC.sp.user";
            else if (this.partyId == PartiesEnum.ADMIN)
                this.partyName = "GENERIC.admin";
            else if (this.partyId == PartiesEnum.CUSTOMER)
                this.partyName = "GENERIC.customer";
            else
                this.partyName = "resv.UNKOWN";
        }

        /*    this.userService.getUserPhoto(this.authUser.id).subscribe((data: UserPhotoDTORecv)=>  {
              // get base 64 from java
              this.imageBlobUrl=data.userPhotoBase64;
            }) ;
      */

    }

    public logOut() {
        this.authService.signOut();

    }
}
