import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {User} from '../../models/user';
import {Observable} from 'rxjs';
import {UsersRolesConjDto} from '../../models/DTO/UsersRolesConjDto';
import {UserPhotoDTO} from '../../models/DTO/UserPhotoDTO';
import {UserPhotoDTORecv} from '../../models/DTO/UserPhotoDTORecv';
import {RolePermsConjDto} from '../../models/DTO/RolePermsConjDto';
import {ResponseDto} from '../../models/DTO/ResponseDto';
import {RegUserDto} from '../../models/DTO/RegUserDto';
import {ChangeUserPassDto} from '../../models/DTO/ChangeUserPassDto';
import {ChangeUserPrefDto} from '../../models/DTO/ChangeUserPrefDto';
import {IdUserNameDto} from '../../models/DTO/IdUserNameDto';
import {Constants} from '../../models/utilites/Constants';
import {ResponseDataModel} from "../../../../projects/app-common/src/lib/appCommon/models/dto/ResponseDataModel";
import {InputDataModel} from "../../../../projects/app-common/src/lib/appCommon/models/dto/InputDataModel";
import {AbstractDataModelService} from "../../../../projects/app-common/src/lib/appCommon/services/AbstractDataModelService";


@Injectable({
    providedIn: 'root'
})
export class UsersService extends AbstractDataModelService<User> {

    constructor(private httpClient: HttpClient) {
        super();
    }

    deActivateUser(dto:IdUserNameDto) {
        return this.httpClient.post<ResponseDataModel<ResponseDto>>(Constants.URL+'/api/users/deActivateUser', dto);
    }

    activateUser(dto:IdUserNameDto) {
        return this.httpClient.post<ResponseDataModel<ResponseDto>>(Constants.URL+'/api/users/activateUser', dto);
    }

    getById(id: number): Observable<User> {
        return this.httpClient.get<User>(Constants.URL+'/api/users/getUserById/' + id);
    }

    getCurrentUserInfo(id: number): Observable<User> {
        return this.httpClient.get<User>(Constants.URL+'/api/users/getUserInfoById/' + id);
    }

    getCurrentUserPrefInfo(id: number): Observable<ChangeUserPrefDto> {
        return this.httpClient.get<ChangeUserPrefDto>(Constants.URL+'/api/users/getUserPrefInfoById/' + id);
    }

    updateUserInfo(regUserDto: RegUserDto): Observable<ResponseDto> {
        return this.httpClient.post<ResponseDto>(Constants.URL+'/api/users/updateUserInfo',regUserDto);
    }

    updateUserPassword(dto: ChangeUserPassDto): Observable<ResponseDto> {
        return this.httpClient.post<ResponseDto>(Constants.URL+'/api/users/updateUserPassword',dto);
    }

    updateUserPreferences(dto: ChangeUserPrefDto): Observable<ResponseDto> {
        return this.httpClient.post<ResponseDto>(Constants.URL+'/api/users/updateUserPreferences',dto);
    }


    addUserToRep(regUserDto: RegUserDto) {
        return this.httpClient.post<User>(Constants.URL+'/api/users/addUserToRep/', regUserDto);
    }


    addUserAdminPerm(regUserDto: RegUserDto) {
        return this.httpClient.post<ResponseDto>(Constants.URL+'/api/users/savePermForAdminUser', regUserDto);
    }

    addUserAdminPermSp(regUserDto: RegUserDto) {
        return this.httpClient.post<ResponseDto>(Constants.URL+'/api/users/savePermForAdminUserSp', regUserDto);
    }

    addUserToRepSp(regUserDto: RegUserDto) {
        return this.httpClient.post<User>(Constants.URL+'/api/users/addUserToRepSp/', regUserDto);
    }

    deActivateUserSp(dto:IdUserNameDto) {
        return this.httpClient.post<ResponseDataModel<ResponseDto>>(Constants.URL+'/api/users/deActivateUserSp', dto);
    }

    activateUserSp(dto:IdUserNameDto) {
        return this.httpClient.post<ResponseDataModel<ResponseDto>>(Constants.URL+'/api/users/activateUserSp', dto);
    }

    // override
    loadData(inputDataModel:InputDataModel): Observable<ResponseDataModel<User>> {
        return this.httpClient.post<ResponseDataModel<User>>(Constants.URL+'/api/adminUsers/getFiltersSortedUsersData', inputDataModel);

    }



    // override
    loadDataNotObservable(offset, limit): ResponseDataModel<User> {
        this.httpClient.get<ResponseDataModel<User>>(Constants.URL+'/api/users/getAllUsersBatch/' + offset + '/' + limit).subscribe((response: ResponseDataModel<User>) => {
           console.log("resp"+ response.numberOfRecords)
            return  response;
        },
            error => {
                return  null;

            });

        return  null;
    }

// override
    updateObj(data: User) {
    }

// override
    deleteObj(data: User) {
    }

// override
    saveObj(data: User) {
    }

//////////////////  old code

    public search(user: User): Observable<User> {
        // set http param
        //  let httpParams = new HttpParams().set('userName',userName);
        //  let options = { params: httpParams };
        //  console.log(userName)
        return this.httpClient.post<User>(Constants.URL+'/api/users/findByName', user);
    }

    public login(userName: string, password: string) {
        // set http param

        let httpParams = new HttpParams();
        httpParams.set('userName', userName);
        // httpParams.set('password',password);
        let options = {params: httpParams};

        return this.httpClient.get<User>(Constants.URL+'/api/users/login/' + userName + '/' + password);
    }

    public addUser(user: User) {
        // set http param
        //  let httpParams = new HttpParams().set('image',user.userPhoto:File);
        //  let options = { params: httpParams };
        return this.httpClient.post(Constants.URL+'/api/users/addUser', user);
    }


    public addUserWithAttachments(user: User,file:File,file2:File) {
        let input = new FormData();
        input.append('file2', file2);
        input.append('file', file);
        var userDet = JSON.stringify(user);
        input.append('user', userDet );
        return this.httpClient.post(Constants.URL+'/api/users/addUserWithAttachment', input);
    }


    public deleteUser(id: any) {
        // set http param
        let httpParams = new HttpParams().set('id', id);
        let options = {params: httpParams};
        return this.httpClient.delete(Constants.URL+'/api/users/deleteUser', options);
    }

    public updateUserPermissions(usersRolesConjDto: UsersRolesConjDto) {
        // let httpParams = new HttpParams().set('userId',userId);
        // let options = { params: httpParams };
        return this.httpClient.post(Constants.URL+'/api/perms/updateUserRoles', usersRolesConjDto);
    }

    public updateUserPhoto(fileData: UserPhotoDTO) {
        let input = new FormData();
        let file = fileData.userPhotoFile;
        let userId = fileData.user.id;
        input.append('file', file);
        input.append('userId', userId + '');

        return this.httpClient.post(Constants.URL+'/api/users/updateUserPhoto', input);
    }


    public getUserPhoto(id: number): Observable<UserPhotoDTORecv> {
        let input = new FormData();
        input.append('userId', id + '');
        return this.httpClient.post<UserPhotoDTORecv>(Constants.URL+'/api/users/retriveUserPhoto', input);
    }

    public getPersonalUserPhoto(id: number): Observable<File> {

        return this.httpClient.get<File>(Constants.URL+'/api/users/retriveUserPersonalPhoto'+'/' + id);
    }


    public updateRolePermissions(rolePermsConjDto: RolePermsConjDto) {

        return this.httpClient.post(Constants.URL+'/api/perms/updateRolePerms', rolePermsConjDto);
    }




}

 


