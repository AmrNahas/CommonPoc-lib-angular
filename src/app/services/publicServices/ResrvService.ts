import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Router} from '@angular/router';
import {User} from '../../models/user';
import {Constants} from '../../models/utilites/Constants';
import {SvHiringReservationDto} from "../../models/DTO/SvHiringReservationDto";
import {AbstractDataModelService} from "../../appCommon/services/AbstractDataModelService";
import {SvHiringReservation} from "../../models/DTO/SvHiringReservation";
import {Observable} from "rxjs";
import {InputDataModel} from "../../appCommon/models/dto/InputDataModel";
import {ResponseDataModel} from "../../appCommon/models/dto/ResponseDataModel";
import {Vehicles} from "../../models/spServices/Vehicles";


@Injectable({providedIn: 'root'})
export class ResrvService extends AbstractDataModelService<SvHiringReservation> {

    constructor(private http: HttpClient, public router: Router) {
        super();
    }

    addNewHireReservationForVehicle(resvDto: SvHiringReservationDto) {
        return this.http.post<User>(Constants.URL + '/api/VehicleHiringReservations/addNewHiringVehicleReservation', resvDto);
    }


    deleteObj(data: SvHiringReservation) {
    }

    getById(id: number): Observable<SvHiringReservation> {
        return undefined;
    }

    loadData(inputDataModel: InputDataModel): Observable<ResponseDataModel<SvHiringReservation>> {
        return this.http.post<ResponseDataModel<SvHiringReservation>>(Constants.URL+'/api/VehicleHiringReservations/getFiltersSortedData', inputDataModel);

    }

    saveObj(data: SvHiringReservation) {
    }

    updateObj(data: SvHiringReservation) {
    }


}
