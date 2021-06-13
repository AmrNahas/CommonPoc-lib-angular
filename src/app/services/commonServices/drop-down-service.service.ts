import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Country } from '../../models/country';
import { City } from '../../models/city';
import { SysModule } from '../../models/SysModule';
import {Constants} from '../../models/utilites/Constants';
import {LocalSelectItem} from "app-common";

@Injectable({
  providedIn: 'root'
})
export class DropDownService {

  constructor(private httpClient: HttpClient) { }
  public getALlCountries():Observable<Array<Country>>{
        return this.httpClient.get<Array<Country>>(Constants.URL+'/api/helper/getAllCountries');
  }

    public getAllCountriesDropDownValues():Observable<Array<LocalSelectItem>>{
        return this.httpClient.get<Array<LocalSelectItem>>(Constants.URL+'/api/helper/getCntryDropDownValues');
    }

    public getAllSvTypesList():Observable<Array<LocalSelectItem>>{
        return this.httpClient.get<Array<LocalSelectItem>>(Constants.URL+'/api/helper/findAllSvTypes');
    }

    public getAllCitiesForCountryDropDown(id: any):Observable<Array<LocalSelectItem>>{
        return this.httpClient.get<Array<LocalSelectItem>>(Constants.URL+'/api/helper/getAllCitiesSelectItemsForCountry/'+id);
    }

    public loadAllSpAsDropDown():Observable<Array<LocalSelectItem>>{
        return this.httpClient.get<Array<LocalSelectItem>>(Constants.URL+'/api/authHelper/loadAllSpAsDropDown');
    }

 
  public getCitiesForCountry(id: any):Observable<Array<City>>{
        return this.httpClient.get<Array<City>>(Constants.URL+'/api/helper/getAllCitiesForCountry/'+id);
  }

    public getSystemModules( roleId:number):Observable<Array<SysModule>>{
    return this.httpClient.get<Array<SysModule>>(Constants.URL+'/api/perms/getAllModules/'+roleId);
}


    public getAllSysServices( ):Observable<Array<LocalSelectItem>>{
        return this.httpClient.get<Array<LocalSelectItem>>(Constants.URL+'/api/helper/getAllSysServicesItems');
    }

    public getAllSysParties( ):Observable<Array<LocalSelectItem>>{
        return this.httpClient.get<Array<LocalSelectItem>>(Constants.URL+'/api/helper/getAllSysPartiesItems');
    }

    public loadStatusList(): Array<LocalSelectItem> {
        let options = Array<LocalSelectItem>();
        options.push(new LocalSelectItem('فعال', 'Active', 0));
        options.push(new LocalSelectItem('غير فعال', 'InActive', 1));
        return options;
    }

    public loadSpTypes(): Array<LocalSelectItem> {
        let options = Array<LocalSelectItem>();
        options.push(new LocalSelectItem('شركة/مؤسسة', 'Company/Org', 1));
        options.push(new LocalSelectItem('افراد', 'Indivual', 2));
        return options;
    }


    public getAllTicketTypes():Observable<Array<LocalSelectItem>>{
        return this.httpClient.get<Array<LocalSelectItem>>(Constants.URL+'/api/helper/getTicketScType');
    }
}
