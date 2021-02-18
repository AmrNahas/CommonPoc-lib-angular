import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Router} from '@angular/router';
import {AbstractDataModelService} from "../../../appCommon/services/AbstractDataModelService";
import {SvHiringReservation} from "../../../models/DTO/SvHiringReservation";
import {SvHiringReservationDto} from "../../../models/DTO/SvHiringReservationDto";
import {User} from "../../../models/user";
import {Observable} from "rxjs";
import {InputDataModel} from "../../../appCommon/models/dto/InputDataModel";
import {ResponseDataModel} from "../../../appCommon/models/dto/ResponseDataModel";
import {Constants} from "../../../models/utilites/Constants";



@Injectable({providedIn: 'root'})
export class ResrvServiceSp extends AbstractDataModelService<SvHiringReservation> {

    constructor(private http: HttpClient, public router: Router) {
        super();
    }

    deleteObj(data: SvHiringReservation) {
    }

    getById(id: number): Observable<SvHiringReservation> {
        let input={
            "id":id
        }
        return this.http.post<SvHiringReservation>(Constants.URL+'/api/sp/VehicleHiringReservations/getById', input);
    }

    loadData(inputDataModel: InputDataModel): Observable<ResponseDataModel<SvHiringReservation>> {
        return this.http.post<ResponseDataModel<SvHiringReservation>>(Constants.URL+'/api/sp/VehicleHiringReservations/getFiltersSortedData', inputDataModel);

    }

    saveObj(data: SvHiringReservation) {
    }

    updateObj(data: SvHiringReservation) {
    }


}
