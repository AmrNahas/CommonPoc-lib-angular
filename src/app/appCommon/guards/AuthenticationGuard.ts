import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {AuthService} from '../../AuthModule/AuthService';

@Injectable()
export class AuthenticationGuard   implements CanActivate{

    constructor(private router:Router ,private authService:AuthService) {
    }



    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const token=this.authService.getToken();//  localStorage.getItem('token');
        if(token)
            return true;
        else
            this.router.navigate(["/login"])
    }

}
