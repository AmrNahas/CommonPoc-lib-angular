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
import {MyCalenderEvent} from "../../models/DTO/calenderSheduale/MyCalenderEvent";

@Injectable({
    providedIn: 'root'
})
export class EventsService   {

    constructor(private httpClient: HttpClient) {


    }

    getEventsForCurrentUserByMonth(month:number,year:number ): Observable<Array<MyCalenderEvent>> {
        console.log(month+">>"+year)
        return this.httpClient.post<Array<MyCalenderEvent>>(Constants.URL+'/api/events/getEvents', {"month":month,"year":year});
    }


}




