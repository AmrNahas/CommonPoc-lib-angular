import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {AuthService} from '../../AuthModule/AuthService';
import {PartiesEnum} from "../../models/utilites/PartiesEnum";

@Injectable()
export class AdminGuard   implements CanActivate{

    constructor(private router:Router ,private authService:AuthService) {
    }



    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const partyType=this.authService.getUserParty();
        if(partyType!=null && partyType==PartiesEnum.ADMIN)
            return true;
        else
             this.router.navigate(["/error"])
    }

}
