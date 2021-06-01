import {Injectable} from '@angular/core';
import {AbstractDataModelService} from '../../appCommon/services/AbstractDataModelService';
import {User} from '../../models/user';
import {Observable} from 'rxjs';
import {InputDataModel} from '../../appCommon/models/dto/InputDataModel';
import {RepDto} from '../../models/DTO/RepDto';
import {ResponseDataModel} from '../../appCommon/models/dto/ResponseDataModel';
import {HttpClient} from '@angular/common/http';
import {SysRepUser} from '../../models/DTO/SysRepUser';
import {IdUserNameDto} from '../../models/DTO/IdUserNameDto';
import {ResponseDto} from '../../models/DTO/ResponseDto';
import {Constants} from '../../models/utilites/Constants';

@Injectable({
    providedIn: 'root'
})
export class SpRepUserServices extends AbstractDataModelService<SysRepUser> {
    constructor(private httpClient: HttpClient) {
        super();

    }



    deleteObj(data: SysRepUser) {
    }

    getById(id: number): Observable<SysRepUser> {
        return undefined;
    }

    loadData(inputDataModel: InputDataModel): Observable<ResponseDataModel<SysRepUser>> {
        return this.httpClient.post<ResponseDataModel<SysRepUser>>(Constants.URL+'/api/rep/getFiltersSortedUsersDataSp', inputDataModel);
    }

    saveObj(data: SysRepUser) {
    }

    updateObj(data: SysRepUser) {
    }

}
