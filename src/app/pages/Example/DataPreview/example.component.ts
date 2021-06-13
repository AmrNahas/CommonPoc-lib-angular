import {Component, Injector, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';

import {SortDirection} from '@swimlane/ngx-datatable';
import {MatDialog} from '@angular/material/dialog';

import {Observable} from 'rxjs';
import {UsersService} from "../../../services/usersServices/users.service";
import {SysRepUser} from "../../../models/DTO/SysRepUser";
import {DropDownService} from "../../../services/commonServices/drop-down-service.service";
import {User} from "../../../models/user";
import {IdUserNameDto} from "../../../models/DTO/IdUserNameDto";
import {SysRepUserServices} from "../../../services/ExampleServices/SysRepUserServices";
import {ExampleDialogComponent} from "../DataOps/example-dialog.component";
import {LocalSelectItem} from "app-common";
import {FilterProperty} from "app-common";
import {ColumnTypEnum} from   "app-common";
import {FilterOperationEnum} from "app-common";
import { SortCriteria} from "app-common";
import {AppSettings} from "../../../app.settings";
import {AbstractDataModelWrapper} from "../../../Wrappers/abstract-data-model-wrapper.service";



@Component({
    selector: 'app-admin-users',
    templateUrl: './example.component.html',
    encapsulation: ViewEncapsulation.None,
    providers: [UsersService]
})

export class ExampleComponent extends AbstractDataModelWrapper<SysRepUser> implements OnInit {
    constructor(
        public dialog: MatDialog, public dropDownServices: DropDownService,public inject:Injector,public appSettings: AppSettings,
        public repUserService: SysRepUserServices,public usersService:UsersService, public router: Router ) {
        super(repUserService,appSettings);
        // this.formsManager.upsert('perms', this.filterComponentForm);
    }

    prepareDisplayColumns(): string[] {
        return ['firstName', 'lastName', 'userName', 'country', 'city', 'status','comments', 'actions'];
    }


    addPermanentFilterColumns() {
     //   this.permanentFiltersObjValues.push(new FilterCriteria('repInfo:repPartyId', PartiesEnum.ADMIN, FilterOperationEnum.EQUAL));
    }


    addPermanentSortColumn(): SortCriteria {
        return new SortCriteria('userId', SortDirection.asc);
    }

    editData() {
    }

    public addUser( ) {
        let user =new User();
        let dialogRef = this.dialog.open(ExampleDialogComponent, {
            data: user,
            disableClose: true,
            height: '400px',
            width: '600px',
            direction: this.appSettings.settings.rtl ? 'rtl' : 'ltr',
        });

    }

    deActivateUser(id: number) {
        try {
            let dto: IdUserNameDto = new IdUserNameDto(id, null);
            this.usersService.deActivateUser(dto).subscribe((data) => {
                    this.loadDataAndPublish();
                    this.msgsService.showInfoMessageLocal("registration.Updating.profile.success");
                },
                error => {
                    this.msgsService.showErrorMessage(error.error.messageAr + ' ' + error.error.code);
                }
            );
        }
        catch (e) {
            console.warn(e)

        }
    }

    activateUser(id: number) {
        try {
            let dto: IdUserNameDto = new IdUserNameDto(id, null);
            this.usersService.activateUser(dto).subscribe((data) => {
                    this.loadDataAndPublish();
                    this.msgsService.showInfoMessageLocal("registration.Updating.profile.success");
                },
                error => {
                    this.msgsService.showErrorMessage(error.error.messageAr + ' ' + error.error.code);
                }
            );
        }
        catch (e) {
            console.warn(e)

        }

    }




    prepareFiltersColumns() {
        let status = new FilterProperty('USERS.status', 'status', ColumnTypEnum.DROPDOWN, FilterOperationEnum.BIT_CHECK, this.loadStatusListBits(), []);
        let fNameFilterColumn = new FilterProperty('registration.firstName', 'firstName', ColumnTypEnum.TEXT, FilterOperationEnum.MATCH, null, []);
        let lNameFilterColumn = new FilterProperty('registration.lastName', 'lastName', ColumnTypEnum.TEXT, FilterOperationEnum.MATCH, null, []);
        let userNameFilterColumn = new FilterProperty('USERS.userName', 'userName', ColumnTypEnum.TEXT, FilterOperationEnum.MATCH, null, []);
        // let countryFilterColumn = new FilterProperty('USERS.country', 'cntryId', ColumnTypEnum.DROPDOWN_MULTI, FilterOperationEnum.IN_LONG_LIST, this.loadCountryList(), []);
        //

        // Object to create Filter for.
        this.filterPropertiesArr.push(fNameFilterColumn);
        this.filterPropertiesArr.push(lNameFilterColumn);
        this.filterPropertiesArr.push(userNameFilterColumn);
       // this.filterPropertiesArr.push(countryFilterColumn);
        this.filterPropertiesArr.push(status);

    }

    public loadStatusListBits(): Array<LocalSelectItem> {
        let options = Array<LocalSelectItem>();
        // options.push(new LocalSelectItem(this.msgsService.getMessageTranslation('USERS.status'),this.msgsService.getMessageTranslation('USERS.status'),9))
        options.push(new LocalSelectItem('فعال', 'Active', [1, 0]));
        options.push(new LocalSelectItem('غير فعال', 'InActive', [1, 1]));
        return options;
    }


    public loadStatusList(): Array<LocalSelectItem> {
        let options = Array<LocalSelectItem>();
        options.push(new LocalSelectItem('فعال', 'Active', 0));
        options.push(new LocalSelectItem('غير فعال', 'InActive', 1));
        return options;
    }

    public loadCountryList(): Observable<Array<LocalSelectItem>> {
        return this.dropDownServices.getAllCountriesDropDownValues();
    }

    viewData() {
    }

    editRoles() {

    }




// to prevent reload
    /*   @HostListener("window:beforeunload", ["$event"])
         unloadHandler(event: Event) {
            event.returnValue = false;
        }*/


    ngOnInit(): void {
        this.loadDataAndPublish();

    }

}





