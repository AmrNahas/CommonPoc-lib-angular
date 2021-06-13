import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {AuthService} from "../../AuthModule/AuthService";




@Injectable()
export class AuthorizationGuard   implements CanActivate{

    constructor(private router:Router,private authService: AuthService) {
    }



    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        // console.log(route.firstChild.data);
        let pagePerm = route && route.firstChild.data["perm"]   ? route.firstChild.data["perm"] : null;
        if(pagePerm) {
            if(this.authService.isUserHavePerm(parseInt(pagePerm)) )
                return  true;
            else
                this.router.navigate(["/error"])

        }
        else {
            return true;
        }

    }

    public isUserHasPerm(permCode: number): boolean {
        let hasPerm = false;
        let permissions= localStorage.getItem('perms') ;
        if(permissions)
        permissions.split(",").forEach(perm => {
            if (permCode == parseInt(perm)) {
                hasPerm = true;
                return true;
            }
        });
        return hasPerm;
    }

}
// .map(xx => xx.toUpperCase())
