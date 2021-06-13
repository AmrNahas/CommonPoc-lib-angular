import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AuthService} from "./AuthService";
import {AuthUser} from "./AuthUser";




@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(public authService: AuthService) {
        this.authUser = this.authService.currentUserValue;
    }

    HEADER_TYPE: string = 'Authorization';
    HEADER_AUTH_PREFIX: string = 'Bearer ';
    STATUS_NOT_AUTHENTICATED: number = 401;
    STATUS_NOT_AUTHORIZED: number = 403;
    STATUS_EXCEPTION: number = 417;
    authUser: AuthUser;

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.authService.getToken();
        const request = token ? req.clone({headers: req.headers.set(this.HEADER_TYPE, this.HEADER_AUTH_PREFIX + token)}) : req.clone();

        if (token && !this.authService.validateToken()) {
            console.error("token is expired ");
            this.authService.signOut();
         //   return next.handle(false);
        } else {
            return next.handle(request)
                .pipe(
                    tap(event => {
                        if (event instanceof HttpResponse) {
                            // console.error(" looks good  >>status code:"+event.status);
                        }
                    }, error => {
                        //  console.error(" error  >>> status code:"+error.status+ " , message>>>:"+error.message);
                        if (error.status == this.STATUS_NOT_AUTHENTICATED) {
                            console.error("STATUS_NOT_AUTHENTICATED ");
                            this.authService.signOut();
                        }
                        if (error.status == this.STATUS_NOT_AUTHORIZED) {
                            console.error("STATUS_NOT_AUTHENTICATED ");
                            this.authService.gotoForbiddenPage();
                        }

                    })
                );


        }
    }
    /* // any other technical exception
                           if (error.status == this.STATUS_EXCEPTION) {
                               this.authService.gotoForbiddenPage();
                           }*/

}
