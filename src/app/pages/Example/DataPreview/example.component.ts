import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';

import {SortDirection} from '@swimlane/ngx-datatable';
import {MatDialog} from '@angular/material/dialog';

import {Observable} from 'rxjs';
import {UsersService} from "../../../services/usersServices/users.service";
import {AppSettings} from "../../../app.settings";
import {AbstractDataModelWrapper} from "../../../Wrappers/abstract-data-model-wrapper.service";
import {SortCriteria} from "../../../../../projects/app-common/src/lib/appCommon/models/dto/SortCriteria";
import {FilterProperty} from "../../../../../projects/app-common/src/lib/appCommon/models/dto/FilterProperty";
import {ColumnTypEnum} from "../../../../../projects/app-common/src/lib/appCommon/models/enum/ColumnTypEnum";
import {
    FilterOperationEnum
} from "../../../../../projects/app-common/src/lib/appCommon/models/enum/FilterOperationEnum";
import {LocalSelectItem} from "../../../../../projects/app-common/src/lib/appCommon/models/dto/LocalSelectItem";
import {EncryptDecrypt} from "../../../../../projects/app-common/src/lib/appCommon/utility/EncryptDecrypt";
import {Employee} from "../../../models/Employee";
import {Employee2Service} from "../../../services/ExampleServices/employee2.Service";


@Component({
    selector: 'app-admin-users',
    templateUrl: './example.component.html',
    encapsulation: ViewEncapsulation.None,
    providers: [UsersService]
})

export class ExampleComponent extends AbstractDataModelWrapper<Employee> implements OnInit {
    constructor(
        public dialog: MatDialog,   public appSettings: AppSettings,
        public employeeService: Employee2Service, public router: Router) {
        super(employeeService, appSettings);
        this.formsManager.upsert('emps', this.filterComponentForm);

    }

    addPermanentFilterColumns(): any {
        //   this.permanentFiltersObjValues.push(new FilterCriteria('repInfo:repPartyId', PartiesEnum.ADMIN, FilterOperationEnum.EQUAL));
    }

    addPermanentSortColumn(): SortCriteria {
        return new SortCriteria('empId', SortDirection.desc);
    }

    editData(): any {
    }

    prepareDisplayColumns(): Array<string> {
        return ['firstName', 'lastName','hijriDate', 'country', 'city', 'status', 'actions'];
    }

    prepareFiltersColumns(): any {
        let status = new FilterProperty('USERS.status', 'status', ColumnTypEnum.DROPDOWN, FilterOperationEnum.BIT_CHECK, this.loadStatusListBits(), []);
        let fNameFilterColumn = new FilterProperty('registration.firstName', 'firstName', ColumnTypEnum.TEXT, FilterOperationEnum.MATCH, null, []);
        let lNameFilterColumn = new FilterProperty('registration.lastName', 'lastName', ColumnTypEnum.TEXT, FilterOperationEnum.MATCH, null, []);
        let countryFilterColumn = new FilterProperty('USERS.country', 'cntryId', ColumnTypEnum.DROPDOWN_MULTI, FilterOperationEnum.IN_LONG_LIST, this.loadCountryList(), []);
        let hijri = new FilterProperty('resv.date', 'hijriDate', ColumnTypEnum.DATE_Hij, FilterOperationEnum.EQUAL, null, []);

        // Object to create Filter for.
        this.filterPropertiesArr.push(fNameFilterColumn);
        this.filterPropertiesArr.push(lNameFilterColumn);
        this.filterPropertiesArr.push(countryFilterColumn);
        this.filterPropertiesArr.push(status);
        this.filterPropertiesArr.push(hijri);
    }

    viewData(): any {
    }

    ngOnInit(): void {
        this.loadDataAndPublish();
    }

    public loadStatusListBits(): Array<LocalSelectItem> {
        let options = Array<LocalSelectItem>();
        // options.push(new LocalSelectItem(this.msgsService.getMessageTranslation('USERS.status'),this.msgsService.getMessageTranslation('USERS.status'),9))
        options.push(new LocalSelectItem('فعال', 'Active', [1, 0]));
        options.push(new LocalSelectItem('غير فعال', 'InActive', [1, 1]));
        return options;
    }

    public loadCountryList() :Observable<Array<LocalSelectItem>> {
        return null;//  dropDownService.getAllCountriesDropDownValues();
    }

    public prepareAddEmployee() {
        this.router.navigate(['/pages/employees/addEmp']);
    }

    public prepareEditEmployee(empId:number) {
        this.router.navigate(['/pages/employees/editEmp'],
            { queryParams: { p: EncryptDecrypt.encrypt(empId.toString()) } });
    }

    public viewEmployee(empId:number) {
        this.router.navigate(['/pages/employees/viewEmp'],
            { queryParams: { p: EncryptDecrypt.encrypt(empId.toString()) } });
    }

}





