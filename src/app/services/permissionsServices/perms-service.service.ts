import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Roles } from '../../models/Roles';
import {Constants} from '../../models/utilites/Constants';

@Injectable({
  providedIn: 'root'
})
export class PermsService  {

  constructor(private httpClient: HttpClient) { }
  public getALlRoles():Observable<Array<Roles>>{
        return this.httpClient.get<Array<Roles>>(Constants.URL+'/api/perms/getAllRoles');
  }
 
  public getUserRoles(userId: any):Observable<Array<Roles>>{
        return this.httpClient.get<Array<Roles>>(Constants.URL+'/api/perms/getAllUserRoles/'+userId);
  }
}
