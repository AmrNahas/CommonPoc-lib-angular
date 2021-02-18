import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ResponseDataModel} from '../../appCommon/models/dto/ResponseDataModel';
import {AbstractDataModelService} from '../../appCommon/services/AbstractDataModelService';
import {InputDataModel} from '../../appCommon/models/dto/InputDataModel';
import {Constants} from '../../models/utilites/Constants';
import {Vehicles} from "../../models/spServices/Vehicles";
import {ResponseDto} from "../../models/DTO/ResponseDto";
import {PhotoDTO} from "../../models/DTO/PhotoDTO";

@Injectable({
    providedIn: 'root'
})
export class CustVehiclesService extends AbstractDataModelService<Vehicles> {

    constructor(private httpClient: HttpClient) {
        super();

    }



    loadData(inputDataModel: InputDataModel): Observable<ResponseDataModel<Vehicles>> {
        return this.httpClient.post<ResponseDataModel<Vehicles>>(Constants.URL+'/api/custVehicles/getFiltersSortedData', inputDataModel);
    }

    saveObj(data: Vehicles) {
        return this.httpClient.post<ResponseDto>(Constants.URL+'/api/spVehicles/addNewSpVehicle', data);
    }


    public getSvMasterPhoto(id: number): Observable<string> {
        return this.httpClient.get<string>(Constants.URL+'/api/custVehicles/retrieveMasterPhotoForSvForCust/'+id);
    }



    updateObj(data: Vehicles) {
    }

    deleteObj(data: Vehicles) {

    }

    getById(id: number): Observable<Vehicles> {
        return undefined;
    }

}




