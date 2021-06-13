import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {UserNotifications} from "../../models/DTO/UserNotifications";
import {Observable} from "rxjs";

import {Constants} from "../../models/utilites/Constants";
import {ResponseDto} from "../../models/DTO/ResponseDto";
import {InputDataModel} from "../../../../projects/app-common/src/lib/appCommon/models/dto/InputDataModel";
import {ResponseDataModel} from "../../../../projects/app-common/src/lib/appCommon/models/dto/ResponseDataModel";
import {AbstractDataModelService} from "../../../../projects/app-common/src/lib/appCommon/services/AbstractDataModelService";

@Injectable()
export class NotificationsService extends AbstractDataModelService<UserNotifications> {

    constructor(private httpClient: HttpClient) {
        super();

    }

    loadNotificationsByUser(): Observable<Array<UserNotifications>> {
        return this.httpClient.get<Array<UserNotifications>>(Constants.URL + '/api/userNotification/loadNotifications');
    }

    updateNotificationStatus(notificationUserMapId:number): Observable<ResponseDto> {
        let input ={"id":notificationUserMapId}
        return  this.httpClient.post<ResponseDto>(Constants.URL + '/api/userNotification/updateNotificationStatus',input);
    }


    deleteObj(data: UserNotifications) {
    }

    getById(id: number): Observable<UserNotifications> {
        return undefined;
    }

    loadData(inputDataModel: InputDataModel): Observable<ResponseDataModel<UserNotifications>> {
        return  this.httpClient.post<ResponseDataModel<UserNotifications>>(Constants.URL + '/api/userNotification/getFiltersSortedData',inputDataModel);
    }

    saveObj(data: UserNotifications) {
    }

    updateObj(data: UserNotifications) {
    }


}
