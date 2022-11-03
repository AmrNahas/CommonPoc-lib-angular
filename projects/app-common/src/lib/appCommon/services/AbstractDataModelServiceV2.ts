import {Observable} from 'rxjs';
import {InputDataModel} from '../models/dto/InputDataModel';
import {GenericResponseRoot} from "../models/dto/GenericResponseRoot";
import {ResponseDataModel2} from "../models/dto/ResponseDataModel2";


/*@Injectable({
    providedIn: 'root'
})*/
 export abstract class AbstractDataModelServiceV2<T> {

    protected constructor() { }

    abstract loadData(inputDataModel:InputDataModel):Observable<GenericResponseRoot<ResponseDataModel2<T>>> ;
/*    abstract saveObj(data:T)  ;
    abstract deleteObj(data:T)  ;
    abstract updateObj(data:T)  ;
    abstract getById(id:number):Observable<T>  ;*/





}




