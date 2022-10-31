import {ResponseDataModel} from '../models/dto/ResponseDataModel';
import {Observable} from 'rxjs';
import {InputDataModel} from '../models/dto/InputDataModel';
import {GenericResponseRoot} from "../models/dto/GenericResponseRoot";


/*@Injectable({
    providedIn: 'root'
})*/
 export abstract class AbstractDataModelService<T> {

    protected constructor() { }

    abstract loadData(inputDataModel:InputDataModel):Observable<GenericResponseRoot<ResponseDataModel<T>>> ;
/*    abstract saveObj(data:T)  ;
    abstract deleteObj(data:T)  ;
    abstract updateObj(data:T)  ;
    abstract getById(id:number):Observable<T>  ;*/





}




