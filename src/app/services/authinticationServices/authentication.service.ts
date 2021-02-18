import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {User} from '../../models/user';
import {Router} from '@angular/router';
import {Constants} from '../../models/utilites/Constants';


@Injectable({providedIn: 'root'})
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    public user: User;

    constructor(private httpClient: HttpClient, private router: Router) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(userName: string, password: string) {
        // return this.http.post<any>(`/findByName/`, { username, password })
        return this.httpClient.get<User>(Constants.URL+'/api/users/login/' + userName + '/' + password)
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);

                return user;
            }));
    }

    public findCurrentUser(): User {
        if (localStorage.getItem('currentUser') !== null) {
            this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
            this.currentUser = this.currentUserSubject.asObservable();
            this.currentUser.subscribe(data => {

                this.user = data;
            });
        } else {
            this.user = null;
        }
        return this.user;
    }


    public isUserHaveRole(permCode: any): boolean {
        let hasPerm = false;
        const permissions =[]// this.findCurrentUser().permissions;
        permissions.forEach(perm => {
            // tslint:disable-next-line:triple-equals
            if (permCode == perm) {
                hasPerm = true;
                return true;
            }
        });
        return hasPerm;
    }


    public logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        // localStorage.setItem('lang', null);
        this.currentUserSubject.next(null);
        this.router.navigate(['landing']);
    }
}
