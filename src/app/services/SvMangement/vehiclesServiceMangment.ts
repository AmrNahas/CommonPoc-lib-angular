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
export class VehiclesServiceMangment extends AbstractDataModelService<Vehicles> {

    constructor(private httpClient: HttpClient) {
        super();

    }


    loadData(inputDataModel: InputDataModel): Observable<ResponseDataModel<Vehicles>> {
        return this.httpClient.post<ResponseDataModel<Vehicles>>(Constants.URL + '/api/MngVehicles/getFiltersSortedDataForMng', inputDataModel);
    }

    saveObj(data: Vehicles) {
        return null;
    }


    public acceptSvRequest(svId: number) {
        let input = {svId: svId};
        return this.httpClient.post(Constants.URL + '/api/MngVehicles/approveSvRequest', input);
    }

    public rejectSvRequest(svId: number, comment: string) {
        let input = {
            svId: svId,
            comment: comment
        };
        return this.httpClient.post(Constants.URL + '/api/MngVehicles/rejectSvRequest', input);
    }


    public getSvMasterPhoto(id: number): Observable<PhotoDTO> {
        // let input = new FormData();
        // input.append('svId', id + '');
        // console.warn(input);
        return this.httpClient.get<PhotoDTO>(Constants.URL + '/api/MngVehicles/retrieveMasterPhotoForSvForMng/' + id);
    }

    public getSvBusinessDocuments(id: number): Observable<Array<PhotoDTO>> {
        return this.httpClient.get<Array<PhotoDTO>>(Constants.URL + '/api/MngVehicles/retrieveBusinessPhotoForSvForMng/' + id);
    }

    public checkSvRequestIsPending(svId: number) {
        let input = {svId: svId};
        return this.httpClient.post(Constants.URL + '/api/MngVehicles/checkSvRequestIsPending', input);
    }

    public getSvPhotos(id: number): Observable<Array<PhotoDTO>> {
        return this.httpClient.get<Array<PhotoDTO>>(Constants.URL + '/api/MngVehicles/getSvPhotos/' + id);
    }


    updateObj(data: Vehicles) {
    }

    deleteObj(data: Vehicles) {

    }

    getById(id: number): Observable<Vehicles> {
        return undefined;
    }

}




