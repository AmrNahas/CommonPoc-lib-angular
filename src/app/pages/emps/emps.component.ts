import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {MatDialog} from "@angular/material/dialog";
import {AppSettings} from "../../app.settings";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
// import {JsonArray} from "@angular/compiler-cli/ngcc/src/packages/entry_point";
import {SortCriteria} from "../../../../projects/app-common/src/lib/appCommon/models/dto/SortCriteria";
import {EncryptDecrypt} from "../../../../projects/app-common/src/lib/appCommon/utility/EncryptDecrypt";
import {AbstractDataModelWrapperServiceV2} from "../../Wrappers/abstract-data-model-wrapper.serviceV2";
import {ActionDetInfo} from "../../../../projects/app-common/src/lib/appCommon/models/dto/ActionDetInfo";
import {EmployeeModel} from "../../models/EmployeeModel";
import {EmployeeServiceV2} from "../../services/ExampleServices/employeeV2.Service";
import {ActionRenderTypeEnum} from "../../../../projects/app-common/src/lib/appCommon/models/enum/ActionRenderTypeEnum";
import {TableProperties} from "../../../../projects/app-common/src/lib/appCommon/models/dto/TableProperties";

@Component({
    selector: 'app-empss',
    templateUrl: './emps.component.html',
    encapsulation: ViewEncapsulation.None,
})

export class EmpsComponent extends AbstractDataModelWrapperServiceV2<EmployeeModel> implements OnInit {

    constructor(
        public dialog: MatDialog, public appSettings: AppSettings,
        public employeeService: EmployeeServiceV2, public router: Router, private http: HttpClient) {
        super(employeeService, appSettings, EmployeeModel);
        this.formsManager.upsert('emps', this.filterComponentForm);
    }

    ngOnInit() {
        this.loadDataAndPublish();
    }

    addPermanentFilterColumns(): any {
        //  this.permanentFiltersObjValues.push(new FilterCriteria('empId', 966655885554, FilterOperationEnum.EQUAL));
    }

    addPermanentSortColumn(): SortCriteria {
        return null;// new SortCriteria('empId', SortDirection.desc);
    }

    defineTableProperties(): TableProperties {
        let recordActionsDetails: Array<ActionDetInfo> = new Array<ActionDetInfo>(new ActionDetInfo('view', "primary", "pageview", this.view)
            , new ActionDetInfo('edit', "accent", "edit", this.edit)
            , new ActionDetInfo('delete', "warn", "delete", this.delete));
        let tableActionsDetails: Array<ActionDetInfo> = new Array<ActionDetInfo>(new ActionDetInfo('GENERIC.action.add', "primary", "person_add", this.prepareAddEmployee));

        return new TableProperties("usersTable", "Users", "USERS.title", true, true, ActionRenderTypeEnum.TOGGLE, recordActionsDetails, tableActionsDetails);
    }


    viewData(): any {
    }


    public prepareAddEmployee = () => {
        this.router.navigate(['/pages/employees/addEmp']).then(r => {
        });
    };


    public delete = (emp: EmployeeModel) => {
        this.loadDataAndPublish();
        // this.router.navigate(['/pages/employees/addEmp']).then(r => {});
    };


    public edit = (emp: EmployeeModel) => {
        this.router.navigate(['/pages/employees/editEmp'],
            {queryParams: {p: EncryptDecrypt.encrypt(emp.empId.toString())}});
    };


    public view = (emp: EmployeeModel) => {
        this.router.navigate(['/pages/employees/viewEmp'],
            {queryParams: {p: EncryptDecrypt.encrypt(emp.empId.toString())}});
        // this.loadDataAndPublish();
    };


}

