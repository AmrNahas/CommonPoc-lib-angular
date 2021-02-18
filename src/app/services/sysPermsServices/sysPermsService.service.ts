import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ResponseDataModel} from '../../appCommon/models/dto/ResponseDataModel';
import {AbstractDataModelService} from '../../appCommon/services/AbstractDataModelService';
import {InputDataModel} from '../../appCommon/models/dto/InputDataModel';
import {SysPermission} from '../../models/SysPermssions';
import {ResponseDto} from '../../models/DTO/ResponseDto';
import {IdUserNameDto} from '../../models/DTO/IdUserNameDto';
import {Constants} from '../../models/utilites/Constants';

@Injectable({
    providedIn: 'root'
})
export class SysPermsService extends AbstractDataModelService<SysPermission> {

    constructor(private httpClient: HttpClient) {
        super();

    }

    public getAllPermsByPartyId(partyId: number):Observable<Array<SysPermission>>{
        return this.httpClient.get<Array<SysPermission>>(Constants.URL+'/api/permissions/getAllPermsByParty/'+partyId);
    }

    public getAllPermsByPartyAndUser(partyId: number,userId: number):Observable<Array<SysPermission>>{
        return this.httpClient.get<Array<SysPermission>>(Constants.URL+'/api/permissions/getAllPermsByPartyWithStatusForUser/'+partyId+'/'+userId);
    }


    deActivate(dto:IdUserNameDto) {
        return this.httpClient.post<ResponseDataModel<ResponseDto>>(Constants.URL+'/api/permissions/deactivatePerm', dto);
    }

    activatePerm(dto:IdUserNameDto) {
        return this.httpClient.post<ResponseDataModel<ResponseDto>>(Constants.URL+'/api/permissions/activatePerm', dto);
    }


    loadData(inputDataModel: InputDataModel): Observable<ResponseDataModel<SysPermission>> {
        return this.httpClient.post<ResponseDataModel<SysPermission>>(Constants.URL+'/api/permissions/getFiltersSortedUsersData', inputDataModel);
    }

    saveObj(data: SysPermission) {
    }

    updateObj(data: SysPermission) {
    }

    deleteObj(data: SysPermission) {

    }

    getById(id: number): Observable<SysPermission> {
        return undefined;
    }

}

 


