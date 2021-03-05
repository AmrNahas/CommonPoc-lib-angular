import {Component, OnInit} from "@angular/core";
import {AppSettings} from "../../app.settings";
import {AuthService} from "../../AuthModule/AuthService";
import {Settings} from "../../app.settings.model";
import {SortCriteria} from "../../appCommon/models/dto/SortCriteria";
import {SortDirection} from "@swimlane/ngx-datatable";
import {LocalSelectItem} from "../../appCommon/models/dto/LocalSelectItem";
import {Observable} from "rxjs";
import {MessagesService} from "../../appCommon/utility/MessagesService";
import {MatDialog} from "@angular/material/dialog";
import {Topic} from "../../models/Topic";
import {Meeting} from "../../models/Meeting";
import {MeetingService} from "../../services/MeetingService";
import {AbstractDataModelContrlPublic} from "../publicPages/AbstractDataModelContrlPublic";

@Component({
    selector: 'seminars-pages',
    templateUrl: './seminars.component.html',
    styleUrls: ['./seminars.component.scss'],

})

export class SeminarsComponent extends AbstractDataModelContrlPublic<Meeting> implements OnInit {
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
    public sortByValue: number;

    public desc: string;
    public typeId: number;
    public comment: string;

    constructor(public appSettings: AppSettings, public  service: MeetingService,
                public dialog: MatDialog, public authService: AuthService, public msgService: MessagesService) {
        super(service);
        this.settings = this.appSettings.settings;
        this.isLoggedIn = authService.validateToken();
        this.sortByValue = 1;
        if (this.isLoggedIn)
            this.removeRegHint = true;

    }

    prepareDisplayColumns(): string[] {
        return ['id', 'title', 'place', 'date','time'];
    }

    addToSchedual(meeting:Meeting){
        this.service.addEventToCalender(meeting).subscribe( data => {
                this.msgService.showInfoMessageLocal('GENERIC.server.success');
            },
            error => {
                this.msgService.showErrorMessage(error.error.messageAr);
            })
    }




    closeRegPanel() {
        this.removeRegHint = true;
    }


    prepareFiltersColumns() {
        /*        let cityFilterColumn = new FilterProperty('Home.search.destination', 'cityId', ColumnTypEnum.DROPDOWN, FilterOperationEnum.EQUAL, this.loadCityList(), []);
                if (this.cityValue != null && (this.cityValue == 4))
                    cityFilterColumn.value = Number(this.cityValue);
                let personsNum = new FilterProperty('Home.search.persons.count', 'maxSeatsNum', ColumnTypEnum.TEXT, FilterOperationEnum.GREATER_THAN_EQUAL, null, []);
                personsNum.value = this.numOfPersons;
                let typeFilterColumn = new FilterProperty('sv.type', 'typeId', ColumnTypEnum.DROPDOWN, FilterOperationEnum.EQUAL, this.loadSvTypes(), []);
                if (this.typeValue != null && (this.typeValue == 1 || this.typeValue == 2 || this.typeValue == 3))
                    typeFilterColumn.value = Number(this.typeValue);
                let hoursNum = new FilterProperty('Home.search.hours.count', 'minHourForHire', ColumnTypEnum.TEXT, FilterOperationEnum.GREATER_THAN_EQUAL, null, []);

                this.filterPropertiesArr.push(cityFilterColumn);
                this.filterPropertiesArr.push(typeFilterColumn);
                this.filterPropertiesArr.push(personsNum);
                this.filterPropertiesArr.push(hoursNum);*/

    }


    public loadSvTypes(): Observable<Array<LocalSelectItem>> {
        return this.dropDownServices.getAllSvTypesList();
    }

    public loadCityList(): Observable<Array<LocalSelectItem>> {
        return this.dropDownServices.getAllCitiesForCountryDropDown(1);
    }


    ngOnInit() {
        this.loadDataAndPublish();
    }

    addPermanentFilterColumns() {
        //approved Only
        //  this.permanentFiltersObjValues.push(new FilterCriteria('status', 0, FilterOperationEnum.EQUAL));
    }

    addPermanentSortColumn(): SortCriteria {
        return new SortCriteria('id', SortDirection.asc);
    }

/*
    addMeeting() {
        let meeting =new Meeting();
        let dialogRef = this.dialog.open(AddMeetingDialogComponent, {
            data: meeting,
            disableClose: true,
            height: '500px',
            width: '850px',
            direction: this.appSettings.settings.rtl ? 'rtl' : 'ltr',
        });
    }*/


    editData() {
    }


    viewData() {
    }


}



