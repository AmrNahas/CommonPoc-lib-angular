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


    viewData(): any {
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

