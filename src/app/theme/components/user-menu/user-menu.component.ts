import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {UsersService} from 'src/app/services/usersServices/users.service';
import {PartiesEnum} from "../../../models/utilites/PartiesEnum";
import {EncryptDecrypt} from "../../../../../projects/app-common/src/lib/appCommon/utility/EncryptDecrypt";

import {AuthUser} from "../../../AuthModule/AuthUser";
import {AuthService} from "../../../AuthModule/AuthService";

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
    public typeId: number;

    constructor(private router: Router, public authService: AuthService, public userService: UsersService) {
        this.authUser = authService.currentUserValue
        this.userLoggedIn = authService.validateToken();
        this.typeId = EncryptDecrypt.decrypt(localStorage.getItem('sec_sess_tpId'));
    }


    ngOnInit() {
        if (this.typeId) {
              if (this.typeId == PartiesEnum.ADMIN)
                this.partyName = "SP.type.organisation";
            else if (this.typeId == PartiesEnum.CUSTOMER)
                this.partyName = "SP.type.individual";
            else
                this.partyName = "resv.UNKOWN";
        }


    }

    public logOut() {
        this.authService.signOut();

    }
}
