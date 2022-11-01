import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Constants} from '../../models/utilites/Constants';
import {ResponseDto} from "../../models/DTO/ResponseDto";
import {PhotoDTO} from "../../models/DTO/PhotoDTO";
import {
    AbstractDataModelService
} from "../../../../projects/app-common/src/lib/appCommon/services/AbstractDataModelService";
import {Employee} from "../../models/Employee";
import {GenericResponseRoot} from "../../../../projects/app-common/src/lib/appCommon/models/dto/GenericResponseRoot";
import {InputDataModel} from "../../../../projects/app-common/src/lib/appCommon/models/dto/InputDataModel";
import {ResponseDataModel} from "../../../../projects/app-common/src/lib/appCommon/models/dto/ResponseDataModel";

@Injectable({
    providedIn: 'root'
})
export class EmployeeService extends AbstractDataModelService<Employee> {
    constructor(private httpClient: HttpClient) {
        super();

    }


    deleteObj(data: GenericResponseRoot<Employee>) {
    }

    getById(id: number): Observable<Employee> {
        return this.httpClient.get<Employee>(Constants.URL+'/api/employees/findById/'+id);
    }

/*    loadData(inputDataModel: InputDataModel): Observable<GenericResponseRoot<ResponseDataModel<Employee>>> {
        return this.httpClient.post<GenericResponseRoot<ResponseDataModel<Employee>>>(Constants.URL + '/api/employees/getFiltersSortedUsersData', inputDataModel);
    }*/



    saveObj(data: Employee) {
        return this.httpClient.post<ResponseDto>(Constants.URL + '/api/employees/saveNewEmployee/', data);
    }

    updateObj(data: Employee) {
        return this.httpClient.post<ResponseDto>(Constants.URL + '/api/employees/updateEmployee/', data);

    }

    saveObjWithAttachments(idFile:File,ppFile:File,data: Employee ) {
        let input = new FormData();
        input.append('idFile', idFile);
        input.append('ppFile', ppFile);
        var dataStr = JSON.stringify(data);
        input.append('employee', dataStr );
        return this.httpClient.post<ResponseDto>(Constants.URL+'/api/employees/saveNewEmployeeWithAttachment/', input);

    }

    public getAttachments(id: number): Observable<Array<PhotoDTO>> {
        let input = new FormData();
        input.append('id', id + '');
        return this.httpClient.post<Array<PhotoDTO>>(Constants.URL + '/api/employees/loadAttachments/',input);
    }


    loadData(inputDataModel: InputDataModel): Observable<GenericResponseRoot<ResponseDataModel<Employee>>> {
        return this.httpClient.post<GenericResponseRoot<ResponseDataModel<Employee>>>(Constants.URL + '/api/employees/getFiltersSortedUsersData', inputDataModel);
    }
}
