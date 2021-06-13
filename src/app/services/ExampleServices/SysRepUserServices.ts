import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {SysRepUser} from '../../models/DTO/SysRepUser';
import {Constants} from '../../models/utilites/Constants';
import {AbstractDataModelService} from "app-common";
import {ResponseDataModel} from "app-common";
import {InputDataModel} from "app-common";

@Injectable({
    providedIn: 'root'
})
export class SysRepUserServices extends AbstractDataModelService<SysRepUser> {
    constructor(private httpClient: HttpClient) {
        super();

    }



    deleteObj(data: SysRepUser) {
    }

    getById(id: number): Observable<SysRepUser> {
        return undefined;
    }

    loadData(inputDataModel: InputDataModel): Observable<ResponseDataModel<SysRepUser>> {
        return this.httpClient.post<ResponseDataModel<SysRepUser>>(Constants.URL+'/api/admin/getFiltersSortedUsersData', inputDataModel);
    }

    saveObj(data: SysRepUser) {
    }

    updateObj(data: SysRepUser) {
    }

}
