import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ResponseDataModel} from '../../appCommon/models/dto/ResponseDataModel';
import {AbstractDataModelService} from '../../appCommon/services/AbstractDataModelService';
import {InputDataModel} from '../../appCommon/models/dto/InputDataModel';
import {Constants} from '../../models/utilites/Constants';
import {Vehicles} from "../../models/spServices/Vehicles";
import {ResponseDto} from "../../models/DTO/ResponseDto";
import {User} from "../../models/user";
import {UserPhotoDTORecv} from "../../models/DTO/UserPhotoDTORecv";
import {PhotoDTO} from "../../models/DTO/PhotoDTO";

@Injectable({
    providedIn: 'root'
})
export class VehiclesService extends AbstractDataModelService<Vehicles> {

    constructor(private httpClient: HttpClient) {
        super();

    }



    loadData(inputDataModel: InputDataModel): Observable<ResponseDataModel<Vehicles>> {
        return this.httpClient.post<ResponseDataModel<Vehicles>>(Constants.URL+'/api/spVehicles/getFiltersSortedData', inputDataModel);
    }

    saveObj(data: Vehicles) {
        return this.httpClient.post<ResponseDto>(Constants.URL+'/api/spVehicles/addNewSpVehicle', data);
    }


    public addVehicleWithAttachments(veichleObj: Vehicles,masterPic:File,ownerShipFile:File) {
        let input = new FormData();
        input.append('masterPic', masterPic);
        input.append('ownerShipFile', ownerShipFile);
        var veichle = JSON.stringify(veichleObj);
        input.append('veichle', veichle );
        return this.httpClient.post(Constants.URL+'/api/spVehicles/addNewSpVehicleWithAttachment', input);
    }



    public getSvMasterPhoto(id: number): Observable<PhotoDTO> {
        // let input = new FormData();
        // input.append('svId', id + '');
        // console.warn(input);
        return this.httpClient.get<PhotoDTO>(Constants.URL+'/api/spVehicles/retrieveMasterPhotoForSv/'+id);
    }

    updateObj(data: Vehicles) {
    }

    deleteObj(data: Vehicles) {

    }

    getById(id: number): Observable<Vehicles> {
        return undefined;
    }

}




