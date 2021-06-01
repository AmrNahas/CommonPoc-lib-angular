import {Injectable} from '@angular/core';
import {AbstractDataModelService} from '../../appCommon/services/AbstractDataModelService';
import {Observable} from 'rxjs';
import {InputDataModel} from '../../appCommon/models/dto/InputDataModel';
import {RepDto} from '../../models/DTO/RepDto';
import {ResponseDataModel} from '../../appCommon/models/dto/ResponseDataModel';
import {HttpClient} from '@angular/common/http';
import {Constants} from '../../models/utilites/Constants';

@Injectable({
    providedIn: 'root'
})
export class RepServices extends AbstractDataModelService<RepDto> {
    constructor(private httpClient: HttpClient) {
        super();

    }

    deleteObj(data: RepDto) {
    }

    getById(id: number): Observable<RepDto> {
        return undefined;
    }

    loadData(inputDataModel: InputDataModel): Observable<ResponseDataModel<RepDto>> {
        return this.httpClient.post<ResponseDataModel<RepDto>>(Constants.URL+'/api/rep/getFiltersSortedUsersData', inputDataModel);
    }

    saveObj(data: RepDto) {
    }

    updateObj(data: RepDto) {
    }

}
