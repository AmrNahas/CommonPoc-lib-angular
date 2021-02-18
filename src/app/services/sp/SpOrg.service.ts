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
import {OrganisationInfo} from "../../models/spServices/OrganisationInfo";

@Injectable({
    providedIn: 'root'
})
export class SpOrgService extends AbstractDataModelService<OrganisationInfo> {

    constructor(private httpClient: HttpClient) {
        super();

    }


    deActivate(dto:IdUserNameDto) {
        return this.httpClient.post<ResponseDataModel<ResponseDto>>(Constants.URL+'/api/permissions/deactivatePerm', dto);
    }

    activatePerm(dto:IdUserNameDto) {
        return this.httpClient.post<ResponseDataModel<ResponseDto>>(Constants.URL+'/api/permissions/activatePerm', dto);
    }


    loadData(inputDataModel: InputDataModel): Observable<ResponseDataModel<OrganisationInfo>> {
        return this.httpClient.post<ResponseDataModel<OrganisationInfo>>(Constants.URL+'/api/MngOrg/getFiltersSortedData', inputDataModel);
    }

    saveObj(data: OrganisationInfo) {
    }

    updateObj(data: OrganisationInfo) {
    }

    deleteObj(data: OrganisationInfo) {

    }

    getById(id: number): Observable<OrganisationInfo> {
        return undefined;
    }

}

 


