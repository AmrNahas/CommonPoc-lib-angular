import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {MatDialog} from "@angular/material/dialog";
import {AppSettings} from "../../app.settings";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
// import {JsonArray} from "@angular/compiler-cli/ngcc/src/packages/entry_point";
import {Observable} from "rxjs";
import {SortCriteria} from "../../../../projects/app-common/src/lib/appCommon/models/dto/SortCriteria";
import {FilterProperty} from "../../../../projects/app-common/src/lib/appCommon/models/dto/FilterProperty";
import {ColumnTypEnum} from "../../../../projects/app-common/src/lib/appCommon/models/enum/ColumnTypEnum";
import {FilterOperationEnum} from "../../../../projects/app-common/src/lib/appCommon/models/enum/FilterOperationEnum";
import {LocalSelectItem} from "../../../../projects/app-common/src/lib/appCommon/models/dto/LocalSelectItem";
import {EncryptDecrypt} from "../../../../projects/app-common/src/lib/appCommon/utility/EncryptDecrypt";
import {AbstractDataModelWrapperServiceV2} from "../../Wrappers/abstract-data-model-wrapper.serviceV2";
import {dropDownService} from "../../app.module";
import {ActionDetInfo} from "../../../../projects/app-common/src/lib/appCommon/models/dto/ActionDetInfo";
import {EmployeeModel} from "../../models/EmployeeModel";
import {EmployeeServiceV2} from "../../services/ExampleServices/employeeV2.Service";


@Component({
    selector: 'app-empss',
    templateUrl: './emps.component.html',
    encapsulation: ViewEncapsulation.None,
})

export class EmpsComponent extends AbstractDataModelWrapperServiceV2<EmployeeModel> implements OnInit {

    constructor(
        public dialog: MatDialog, public appSettings: AppSettings,
        public employeeService: EmployeeServiceV2, public router: Router, private http: HttpClient) {
        super(employeeService, appSettings, EmployeeModel );
        this.formsManager.upsert('emps', this.filterComponentForm);
    }

    ngOnInit() {
        this.loadDataAndPublish();
    }

    addPermanentFilterColumns(): any {
      // this.permanentFiltersObjValues.push(new FilterCriteria('empId', 966655885554, FilterOperationEnum.EQUAL));
    }

    addPermanentSortColumn(): SortCriteria {
        return null;// new SortCriteria('empId', SortDirection.desc);
    }


    prepareActionsDetails(): ActionDetInfo[] {
        let actionDetails = [];
        let viewAction: ActionDetInfo = new ActionDetInfo('view', "primary", "pageview", this.view);
        let editAction: ActionDetInfo = new ActionDetInfo('edit', "accent", "edit", this.edit)
        let deleteAction: ActionDetInfo = new ActionDetInfo('delete', "warn", "delete", this.delete);
        actionDetails.push(viewAction, editAction, deleteAction);
        return actionDetails;
    }



    prepareFiltersColumns(): Array<FilterProperty> {
        let filtersArray:Array<FilterProperty>=[]
        let empId = new FilterProperty(null, 'empId', ColumnTypEnum.TEXT, FilterOperationEnum.EQUAL, null, []);
        let identityNum = new FilterProperty(null, 'identityNum', ColumnTypEnum.TEXT, FilterOperationEnum.MATCH, null, []);
        let email = new FilterProperty(null, 'email', ColumnTypEnum.TEXT, FilterOperationEnum.MATCH, null, []);
        let status = new FilterProperty(null, 'status', ColumnTypEnum.DROPDOWN, FilterOperationEnum.BIT_CHECK, this.loadStatusListBits(), []);
        let fNameFilterColumn = new FilterProperty(null, 'firstName', ColumnTypEnum.TEXT, FilterOperationEnum.MATCH, null, []);
        let lNameFilterColumn = new FilterProperty(null, 'lastName', ColumnTypEnum.TEXT, FilterOperationEnum.MATCH, null, []);
        let countryFilterColumn = new FilterProperty(null, 'cntryId', ColumnTypEnum.DROPDOWN, FilterOperationEnum.EQUAL, this.loadCountryList(), []);
        let hijri = new FilterProperty(null, 'hijriDate', ColumnTypEnum.DATE_Hij, FilterOperationEnum.EQUAL, null, []);
        filtersArray.push(fNameFilterColumn,lNameFilterColumn,countryFilterColumn,status,hijri,email,identityNum,empId)
        return filtersArray;
    }

    viewData(): any {
    }


    public loadStatusListBits(): Array<LocalSelectItem> {
        let options = Array<LocalSelectItem>();
        // options.push(new LocalSelectItem(this.msgsService.getMessageTranslation('USERS.status'),this.msgsService.getMessageTranslation('USERS.status'),9))
        options.push(new LocalSelectItem('فعال', 'Active', [1, 0]));
        options.push(new LocalSelectItem('غير فعال', 'InActive', [1, 1]));
        return options;
    }

    public loadCountryList(): Observable<Array<LocalSelectItem>> {
        return dropDownService.getAllCountriesDropDownValues();
    }

    public prepareAddEmployee() {
        this.router.navigate(['/pages/employees/addEmp']);
    }

    public prepareEditEmployee(empId: number) {
        this.router.navigate(['/pages/employees/editEmp'],
            {queryParams: {p: EncryptDecrypt.encrypt(empId.toString())}});
    }

    public viewEmployee(empId: number) {
        this.router.navigate(['/pages/employees/viewEmp'],
            {queryParams: {p: EncryptDecrypt.encrypt(empId.toString())}});
    }

    public delete = () => {
        this.loadDataAndPublish();
    };


    public edit = () => {
        this.loadDataAndPublish();
    };


    public view = () => {
        this.loadDataAndPublish();
    };


}

