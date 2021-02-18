import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ResponseDataModel} from '../models/dto/ResponseDataModel';
import {Observable} from 'rxjs';
import {User} from '../../models/user';
import {FilterCriteria} from '../models/dto/FilterCriteria';
import {InputDataModel} from '../models/dto/InputDataModel';



/*@Injectable({
    providedIn: 'root'
})*/
 export abstract class AbstractDataModelService<T> {

    protected constructor() { }

    abstract loadData(inputDataModel:InputDataModel):Observable<ResponseDataModel<T>> ;
    abstract saveObj(data:T)  ;
    abstract deleteObj(data:T)  ;
    abstract updateObj(data:T)  ;
    abstract getById(id:number):Observable<T>  ;





}




