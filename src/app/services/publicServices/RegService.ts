import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Router} from '@angular/router';
import {RegUserDto} from '../../models/DTO/RegUserDto';
import {User} from '../../models/user';
import {Constants} from '../../models/utilites/Constants';
import {ResponseDto} from "../../models/DTO/ResponseDto";



@Injectable({providedIn: 'root'})
export class RegService  {

    constructor(private http: HttpClient, public router: Router) {

    }

    signUp(regUserDto: RegUserDto) {
        return this.http.post<User>(Constants.URL+'/pub/reg/registration/', regUserDto);
    }





}
