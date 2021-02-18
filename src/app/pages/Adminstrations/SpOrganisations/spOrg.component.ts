import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {SortDirection} from '@swimlane/ngx-datatable';
import {Observable} from 'rxjs';
import {AbstractDataModelController} from "../../../appCommon/controllers/AbstractDataModelController";
import {OrganisationInfo} from "../../../models/spServices/OrganisationInfo";
import {MatDialog} from "@angular/material/dialog";
import {DropDownService} from "../../../services/commonServices/drop-down-service.service";
import {SpOrgService} from "../../../services/sp/SpOrg.service";
import {SortCriteria} from "../../../appCommon/models/dto/SortCriteria";
import {LocalSelectItem} from "../../../appCommon/models/dto/LocalSelectItem";
import {Router} from "@angular/router";
import {AuthService} from "../../../AuthModule/AuthService";
import {MessagesService} from "../../../appCommon/utility/MessagesService";
import {FilterProperty} from "../../../appCommon/models/dto/FilterProperty";
import {ColumnTypEnum} from "../../../appCommon/models/enum/ColumnTypEnum";
import {FilterOperationEnum} from "../../../appCommon/models/enum/FilterOperationEnum";


@Component({
    selector: 'app-spOrg',
    templateUrl: './spOrg.component.html',
    encapsulation: ViewEncapsulation.None,

})


export class SpOrgComponent extends AbstractDataModelController<OrganisationInfo> implements OnInit {
    constructor(
        public dialog: MatDialog, public dropDownServices: DropDownService,
        public service: SpOrgService, public router: Router, public authService: AuthService ,public  msgService:MessagesService  ) {
        super(service);
        this.formsManager.upsert('spOrg', this.filterComponentForm);
    }

    prepareDisplayColumns(): string[] {
        return ['id', 'name', 'type', 'commRegNum','IdNo', 'status', 'actions'];
    }

    addPermanentFilterColumns() {

    }

    addPermanentSortColumn(): SortCriteria {
        return new SortCriteria('id', SortDirection.asc);
    }

    editData() {
    }


    prepareFiltersColumns() {
        let nameFilterColumn = new FilterProperty('USERS.name', 'organisationName', ColumnTypEnum.TEXT, FilterOperationEnum.MATCH, null, []);
        let type= new FilterProperty('sv.type', 'typeId', ColumnTypEnum.DROPDOWN, FilterOperationEnum.EQUAL, this.dropDownServices.loadSpTypes(), []);
        let commRegNum = new FilterProperty('SP.commRegNum', 'commercialRegNum', ColumnTypEnum.TEXT, FilterOperationEnum.EQUAL, null, []);
        let idNo = new FilterProperty('SP.IdNo', 'idNo', ColumnTypEnum.TEXT, FilterOperationEnum.EQUAL, null, []);
        let statusFilterColumn = new FilterProperty('USERS.status', 'status', ColumnTypEnum.DROPDOWN, FilterOperationEnum.EQUAL, this.dropDownServices.loadStatusList(), []);

        this.filterPropertiesArr.push(nameFilterColumn);
        this.filterPropertiesArr.push(type);
        this.filterPropertiesArr.push(commRegNum);
        this.filterPropertiesArr.push(idNo);
        this.filterPropertiesArr.push(statusFilterColumn);
    }


    loadPartiesItems(): Observable<Array<LocalSelectItem>> {
        return this.dropDownServices.getAllSysParties();
    }

    loadServicesItems(): Observable<Array<LocalSelectItem>> {
        return this.dropDownServices.getAllSysServices();
    }


    viewData() {
    }




     ngOnInit(): void {
        this.loadDataAndPublish();

    }

}





