import {Component, OnInit} from '@angular/core';
import {AppSettings} from '../../../app.settings';
import {Settings} from '../../../app.settings.model';
import {ActivatedRoute} from "@angular/router";
import {Vehicles} from "../../../models/spServices/Vehicles";
import {SortCriteria} from "../../../appCommon/models/dto/SortCriteria";
import {SortDirection} from "@swimlane/ngx-datatable";
import {AbstractDataModelContrlPublic} from "../AbstractDataModelContrlPublic";
import {FilterProperty} from "../../../appCommon/models/dto/FilterProperty";
import {ColumnTypEnum} from "../../../appCommon/models/enum/ColumnTypEnum";
import {FilterOperationEnum} from "../../../appCommon/models/enum/FilterOperationEnum";
import {Observable} from "rxjs";
import {LocalSelectItem} from "../../../appCommon/models/dto/LocalSelectItem";
import {PhotoDTO} from "../../../models/DTO/PhotoDTO";
import {AttImg64DialogComponent} from "../../../appCommon/CustomeComponents/attachmentBase64Preview/att-img64-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {AuthService} from "../../../AuthModule/AuthService";
import {MessagesService} from "../../../appCommon/utility/MessagesService";
import {SortOrderEnum} from "../../../appCommon/models/enum/SortOrderEnum";

// import 'rxjs/add/operator/filter';

export class SerachDto {
    public dest: any;
    public numOfPersons: any;
    public date: any;
}

@Component({
    selector: 'app-dashboard',
    templateUrl: './land.component.html',
    styleUrls: ['./land.component.scss']
})
export class LandComponent  { //extends AbstractDataModelContrlPublic<Vehicles> implements OnInit
    imageBlobUrl: any;
    public settings: Settings;
    public projects = [];
    public dest: number;
    public num: number;
    public type: number;
    public isLoggedIn: boolean;
    public removeRegHint: boolean;
    public page: any;
    public sortByLessPrice: number = 1;
    public sortByHighRate: number = 2;
    public sortByLessHours: number = 3;
    public sortByValue:number;
    constructor(){

    }
    //
    // constructor(public appSettings: AppSettings, private activatedRoute: ActivatedRoute,
    //             public dialog: MatDialog, public authService: AuthService, public msgService: MessagesService) {
    //     super(service, activatedRoute.queryParams);
    //     this.settings = this.appSettings.settings;
    //     this.isLoggedIn = authService.validateToken();
    //     this.sortByValue=1;
    //     if (this.isLoggedIn)
    //         this.removeRegHint = true;
    //
    // }
    //
    // closeRegPanel() {
    //     this.removeRegHint = true;
    // }
    //
    //
    // sortBy(value: number) {
    //     this.sortCriteriaArr = [];
    //     if (value == this.sortByLessPrice) {
    //         this.permanentSortCriteria = new SortCriteria("pricePerHour", SortDirection.asc);
    //         this.sortByValue=this.sortByLessPrice;
    //     }
    //     else if (value == this.sortByHighRate) {
    //         this.permanentSortCriteria = new SortCriteria("rate", SortDirection.desc);
    //         this.sortByValue=this.sortByHighRate;
    //     }
    //
    //     else if (value == this.sortByLessHours) {
    //         this.permanentSortCriteria = new SortCriteria("minHourForHire", SortDirection.asc);
    //         this.sortByValue=this.sortByLessHours;
    //     }
    //
    //     this.loadSortedFilteredDataAndShowData();
    //
    // }
    //
    //
    // prepareFiltersColumns() {
    //     let cityFilterColumn = new FilterProperty('Home.search.destination', 'cityId', ColumnTypEnum.DROPDOWN, FilterOperationEnum.EQUAL, this.loadCityList(), []);
    //     if (this.cityValue != null && (this.cityValue == 4))
    //         cityFilterColumn.value = Number(this.cityValue);
    //     let personsNum = new FilterProperty('Home.search.persons.count', 'maxSeatsNum', ColumnTypEnum.TEXT, FilterOperationEnum.GREATER_THAN_EQUAL, null, []);
    //     personsNum.value = this.numOfPersons;
    //     let typeFilterColumn = new FilterProperty('sv.type', 'typeId', ColumnTypEnum.DROPDOWN, FilterOperationEnum.EQUAL, this.loadSvTypes(), []);
    //     if (this.typeValue != null && (this.typeValue == 1 || this.typeValue == 2 || this.typeValue == 3))
    //         typeFilterColumn.value = Number(this.typeValue);
    //     let hoursNum = new FilterProperty('Home.search.hours.count', 'minHourForHire', ColumnTypEnum.TEXT, FilterOperationEnum.GREATER_THAN_EQUAL, null, []);
    //     // hoursNum.value=10;
    //     //   let countryFilterColumn = new FilterProperty('USERS.country', 'countryId', ColumnTypEnum.DROPDOWN_MULTI, FilterOperationEnum.IN_LONG_LIST, this.loadCountryList(), []);
    //     // Object to create Filter for.
    //
    //     //this.filterPropertiesArr.push(countryFilterColumn);
    //
    //
    //     this.filterPropertiesArr.push(cityFilterColumn);
    //     this.filterPropertiesArr.push(typeFilterColumn);
    //     this.filterPropertiesArr.push(personsNum);
    //     this.filterPropertiesArr.push(hoursNum);
    //
    // }
    //
    //
    // public loadSvTypes(): Observable<Array<LocalSelectItem>> {
    //     return this.dropDownServices.getAllSvTypesList();
    // }
    //
    // public loadCityList(): Observable<Array<LocalSelectItem>> {
    //     return this.dropDownServices.getAllCitiesForCountryDropDown(1);
    // }
    //
    // /*  public onPageChanged(event){
    //       this.page = event;
    //       this.loadDataAndPublish();
    //       if(this.settings.fixedHeader){
    //           document.getElementById('main-content').scrollTop = 0;
    //       }
    //       else{
    //           document.getElementsByClassName('mat-drawer-content')[0].scrollTop = 0;
    //       }
    //   }*/
    //
    //
    //
    //
    // ngOnInit() {
    //     if (this.dest)
    //         this.filterComponentForm.controls.cityId.setValue(this.dest);
    //     if (this.num)
    //         this.filterComponentForm.controls.maxSeatsNum.setValue(this.num);
    //     if (this.type)
    //         this.filterComponentForm.controls.typeId.setValue(this.type);
    //     // console.warn(this.dest + '' + this.date + '' + this.num)
    //     this.permanentSortCriteria = new SortCriteria("pricePerHour", SortDirection.asc);
    //     this.loadDataAndPublish();
    // }
    //
    // addPermanentFilterColumns() {
    //     //approved Only
    //     //  this.permanentFiltersObjValues.push(new FilterCriteria('status', 0, FilterOperationEnum.EQUAL));
    // }
    //
    // addPermanentSortColumn(): SortCriteria {
    //     return new SortCriteria('id', SortDirection.asc);
    // }
    //
    // editData() {
    // }
    //
    // prepareDisplayColumns(): string[] {
    //
    //     return [];
    // }
    //
    //
    // viewData() {
    // }
    //
    //


}

