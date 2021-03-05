import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Meeting} from "../models/Meeting";
import {AbstractDataModelService} from "../appCommon/services/AbstractDataModelService";
import {ResponseDataModel} from "../appCommon/models/dto/ResponseDataModel";
import {ResponseDto} from "../models/DTO/ResponseDto";
import {Constants} from "../models/utilites/Constants";
import {InputDataModel} from "../appCommon/models/dto/InputDataModel";

@Injectable({
    providedIn: 'root'
})
export class MeetingService extends AbstractDataModelService<Meeting> {
    deleteObj(data: Meeting) {
    }

    saveObj(data: Meeting) {
        return this.httpClient.post<ResponseDataModel<ResponseDto>>(Constants.URL+'/api/meetings/addMeeting', data);

    }

    addEventToCalender(data: Meeting) {
        return this.httpClient.post<ResponseDataModel<ResponseDto>>(Constants.URL+'/api/meetings/addMeetingToCalender', data);

    }


    updateObj(data: Meeting) {
    }

    constructor(private httpClient: HttpClient) {
        super();
    }



    getById(id: number): Observable<Meeting> {
        return this.httpClient.get<Meeting>(Constants.URL+'/api/users/getUserById/' + id);
    }


    // override
    loadData(inputDataModel:InputDataModel): Observable<ResponseDataModel<Meeting>> {
        return this.httpClient.post<ResponseDataModel<Meeting>>(Constants.URL+'/api/meetings/getFiltersSortedUsersData', inputDataModel);

    }

}
