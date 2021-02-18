import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user';
import {BehaviorSubject, Observable} from 'rxjs';
import {AuthUser} from './AuthUser';
import {map} from 'rxjs/operators';
import {RegiseterDto} from './models/RegiseterDto';
import {Router} from '@angular/router';
import {RegUserDto} from '../models/DTO/RegUserDto';
import {Constants} from '../models/utilites/Constants';
import {EncryptDecrypt} from '../appCommon/utility/EncryptDecrypt';
import {ResponseDataModel} from "../appCommon/models/dto/ResponseDataModel";
import {SvHiringReservation} from "../models/DTO/SvHiringReservation";
import {ResponseDto} from "../models/DTO/ResponseDto";


@Injectable({providedIn: 'root'})
export class AuthService {

    /* token:string;
     private subject =new BehaviorSubject<AuthUser>(null) ;
     user:Observable<AuthUser>=this.subject.asObservable();
     isLoggedIn:Observable<boolean>=this.user.pipe( map(user=> !!user.id));
     isLoggedOut:Observable<boolean>=this.user.pipe( map(isLoggedIn=>!isLoggedIn));*/
    private currentUserSubject: BehaviorSubject<AuthUser>;
    public currentUser: Observable<AuthUser>;

    constructor(private http: HttpClient, public router: Router) {
        this.currentUserSubject = new BehaviorSubject<AuthUser>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }


    public get currentUserValue(): AuthUser {
        return this.currentUserSubject.value;
    }


    signIn(userName: string, password: string) {
        const loginModel = {
            userName: userName,
            password: password,
        };

        return this.http.post<AuthUser>(Constants.URL + '/api/auth/authenticate', loginModel).pipe(map(data => {
            // const authUser=new AuthUser(data.id,data.name,data.userName,data.token,);

            let permsEncArr = [];
            data.permissions.forEach(p => {
                permsEncArr.push(EncryptDecrypt.encrypt(p));
            });
            localStorage.setItem('currentUser', JSON.stringify(data));
            localStorage.setItem('partyId', data.partyId.toString());

            localStorage.setItem('sec_sess_pems', permsEncArr.toString());
            localStorage.setItem('sec_sess_kn', data.token);
            localStorage.setItem('sec_sess_pt',EncryptDecrypt.encrypt(data.partyId.toString()));
            localStorage.setItem('sec_sess_rp_id',EncryptDecrypt.encrypt(data.repId.toString()));
            localStorage.setItem('sec_sess_tkn_et', data.tokenExpiredTime.toString());

            this.currentUserSubject.next(data);
            return data;
        }));

    }

    getCurrentUserRepId(){
       let rpId= localStorage.getItem('sec_sess_rp_id');
       return EncryptDecrypt.decrypt(rpId);
    }

    userPermissions():any[] {
        let permsEncArr = [];
        permsEncArr= localStorage.getItem('sec_sess_pems').split(',');
        let permsDecArr = [];
        permsEncArr.forEach(p => {
            permsDecArr.push(EncryptDecrypt.decrypt(p));
        });
        return permsDecArr;
    }


    signOut() {

        this.http.post<ResponseDto>(Constants.URL + '/api/users/logOut',{"userName":this.currentUserValue.userName}) ;
        localStorage.removeItem('sec_sess_kn');
        localStorage.removeItem('currentUser');
        localStorage.removeItem('sec_sess_pt');
        localStorage.removeItem('partyId');
        localStorage.removeItem('sec_sess_tkn_et');
        localStorage.removeItem('sec_sess_pems');
        localStorage.removeItem('sec_sess_rp_id');
        // todo clear all session storages items
        this.currentUserSubject.next(null);
        this.router.navigate(['/login']);

    }


    loadAllPermByUserId(id: number) {
        return this.http.get<Array<String>>(Constants.URL + '/api/auth/getAllUserPerms/' + id);

    }

    gotoForbiddenPage() {
        this.router.navigate(['/error']);
    }

    validateToken(): boolean {
        const authUser: AuthUser = JSON.parse(localStorage.getItem('currentUser'));
        if (authUser) {
            return authUser.tokenExpiredTime >= new Date().getTime();
        }
        return false;
    }

    getToken (){
      return localStorage.getItem('sec_sess_kn');
      //EncryptDecrypt.decrypt(localStorage.getItem('sec_sess_kn'))
    }

    getUserParty (){
       let pt= localStorage.getItem('sec_sess_pt')
        return  pt!=null? EncryptDecrypt.decrypt(localStorage.getItem('sec_sess_pt')):null;
    }



//old
 /*   public isUserHavePerm(permCode: any): boolean {
        if (!permCode) {
            return true;
        }
        let hasPerm = false;
        const permissions = this.currentUserValue.permissions;
        permissions.forEach(perm => {
            if (permCode == perm) {
                hasPerm = true;
                return true;
            }
        });
        return hasPerm;
    }*/

    public isUserHavePerm(permCode: any): boolean {
        if (!permCode) {
            return true;
        }
        let hasPerm = false;
        let perms = this.userPermissions();
        let length = perms.filter(item => item == permCode).length
        let hasPermission = length > 0;

        if (hasPermission) {
            hasPerm = true;
        }
        return hasPerm;
    }

    public getUserNameAuth(){
        return this.http.get<AuthUser>(Constants.URL+'/api/users/getCurrentUserName');

    }
}
