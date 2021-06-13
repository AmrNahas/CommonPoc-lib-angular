import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';

import {AuthUser} from '../../../AuthModule/AuthUser';
import {AuthService} from "../../../AuthModule/AuthService";

@Component({
    selector: 'app-public-action',
    templateUrl: './public-action.component.html',
    styleUrls: ['./public-action.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class PublicActionComponent implements OnInit {
    authUser: AuthUser;
    public userLoggedIn: boolean;

    constructor(private router: Router, public authService: AuthService) {
        this.userLoggedIn = authService.validateToken();
    }

    ngOnInit() {

    }


}
