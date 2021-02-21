import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ResponseDataModel} from '../../appCommon/models/dto/ResponseDataModel';
import {AbstractDataModelService} from '../../appCommon/services/AbstractDataModelService';
import {InputDataModel} from '../../appCommon/models/dto/InputDataModel';
import {Constants} from '../../models/utilites/Constants';
import {ResponseDto} from "../../models/DTO/ResponseDto";
import {Topic} from "../../models/Topic";
import {IdUserNameDto} from "../../models/DTO/IdUserNameDto";
import {ChangeUserPrefDto} from "../../models/DTO/ChangeUserPrefDto";
import {RegUserDto} from "../../models/DTO/RegUserDto";
import {ChangeUserPassDto} from "../../models/DTO/ChangeUserPassDto";
import {TopicDet} from "../../models/TopicDet";
import {TopicLiker} from "../../models/TopicLiker";

@Injectable({
    providedIn: 'root'
})
export class TopicService extends AbstractDataModelService<Topic> {
    deleteObj(data: Topic) {
    }

    saveObj(data: Topic) {
        return this.httpClient.post<ResponseDataModel<ResponseDto>>(Constants.URL+'/api/topics/addNewTopic', data);

    }

    saveComment(data: TopicDet) {
        return this.httpClient.post<ResponseDataModel<ResponseDto>>(Constants.URL+'/api/topics/addNewCommentToTopic', data);

    }

    addLikeToTopic(data: TopicLiker) {
        return this.httpClient.post<ResponseDataModel<ResponseDto>>(Constants.URL+'/api/topics/addLikeToTopic', data);

    }



    updateObj(data: Topic) {
    }

    constructor(private httpClient: HttpClient) {
        super();
    }

    deActivateUser(dto:IdUserNameDto) {
        return this.httpClient.post<ResponseDataModel<ResponseDto>>(Constants.URL+'/api/users/deActivateUser', dto);
    }

    activateUser(dto:IdUserNameDto) {
        return this.httpClient.post<ResponseDataModel<ResponseDto>>(Constants.URL+'/api/users/activateUser', dto);
    }

    getById(id: number): Observable<Topic> {
        return this.httpClient.get<Topic>(Constants.URL+'/api/users/getUserById/' + id);
    }

    getCurrentUserInfo(id: number): Observable<Topic> {
        return this.httpClient.get<Topic>(Constants.URL+'/api/users/getUserInfoById/' + id);
    }

    getCurrentUserPrefInfo(id: number): Observable<ChangeUserPrefDto> {
        return this.httpClient.get<ChangeUserPrefDto>(Constants.URL+'/api/users/getUserPrefInfoById/' + id);
    }

    updateUserInfo(regUserDto: RegUserDto): Observable<ResponseDto> {
        return this.httpClient.post<ResponseDto>(Constants.URL+'/api/users/updateUserInfo',regUserDto);
    }

    updateUserPassword(dto: ChangeUserPassDto): Observable<ResponseDto> {
        return this.httpClient.post<ResponseDto>(Constants.URL+'/api/users/updateUserPassword',dto);
    }

    updateUserPreferences(dto: ChangeUserPrefDto): Observable<ResponseDto> {
        return this.httpClient.post<ResponseDto>(Constants.URL+'/api/users/updateUserPreferences',dto);
    }




    // override
    loadData(inputDataModel:InputDataModel): Observable<ResponseDataModel<Topic>> {
        return this.httpClient.post<ResponseDataModel<Topic>>(Constants.URL+'/api/pub/topics/getFiltersSortedUsersData', inputDataModel);

    }

}
