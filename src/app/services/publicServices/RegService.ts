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


    customerSignUp(regUserDto: RegUserDto) {
        return this.http.post<User>(Constants.URL+'/pub/reg/customerRegistration/', regUserDto);
    }

    spSignUp(regUserDto: RegUserDto ,file:File) {
        let input = new FormData();
        input.append('file', file);
        var regInfo = JSON.stringify(regUserDto);
        console.warn(regInfo);
        input.append('regInfo', regInfo );
        return this.http.post<ResponseDto>(Constants.URL+'/pub/reg/serviceProviderRegistration/', input);
    }




}
