import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';

import {SortDirection} from '@swimlane/ngx-datatable';
import {MatDialog} from '@angular/material/dialog';

import {Observable} from 'rxjs';
import {UsersService} from "../../../services/usersServices/users.service";
import {AbstractDataModelController} from "../../../appCommon/controllers/AbstractDataModelController";
import {SysRepUser} from "../../../models/DTO/SysRepUser";
import {DropDownService} from "../../../services/commonServices/drop-down-service.service";
import {FilterCriteria} from "../../../appCommon/models/dto/FilterCriteria";
import {PartiesEnum} from "../../../models/utilites/PartiesEnum";
import {FilterOperationEnum} from "../../../appCommon/models/enum/FilterOperationEnum";
import {SortCriteria} from "../../../appCommon/models/dto/SortCriteria";
import {User} from "../../../models/user";
import {IdUserNameDto} from "../../../models/DTO/IdUserNameDto";
import {FilterProperty} from "../../../appCommon/models/dto/FilterProperty";
import {ColumnTypEnum} from "../../../appCommon/models/enum/ColumnTypEnum";
import {LocalSelectItem} from "../../../appCommon/models/dto/LocalSelectItem";
import {SysRepUserServices} from "../../../services/ExampleServices/SysRepUserServices";
import {ExampleDialogComponent} from "../DataOps/example-dialog.component";



@Component({
    selector: 'app-admin-users',
    templateUrl: './example.component.html',
    encapsulation: ViewEncapsulation.None,
    providers: [UsersService]
})

export class ExampleComponent extends AbstractDataModelController<SysRepUser> implements OnInit {
    constructor(
        public dialog: MatDialog, public dropDownServices: DropDownService,
        public repUserService: SysRepUserServices,public usersService:UsersService, public router: Router ) {
        super(repUserService);
        this.formsManager.upsert('perms', this.filterComponentForm);
    }

    prepareDisplayColumns(): string[] {
        return ['firstName', 'lastName', 'userName', 'country', 'city', 'status','comments', 'actions'];
    }


    addPermanentFilterColumns() {
        this.permanentFiltersObjValues.push(new FilterCriteria('repInfo:repPartyId', PartiesEnum.ADMIN, FilterOperationEnum.EQUAL));
    }


    addPermanentSortColumn(): SortCriteria {
        return new SortCriteria('repId', SortDirection.asc);
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
        let status = new FilterProperty('USERS.status', 'user:status', ColumnTypEnum.DROPDOWN, FilterOperationEnum.BIT_CHECK, this.loadStatusListBits(), []);
        let fNameFilterColumn = new FilterProperty('registration.firstName', 'user:firstName', ColumnTypEnum.TEXT, FilterOperationEnum.MATCH, null, []);
        let lNameFilterColumn = new FilterProperty('registration.lastName', 'user:lastName', ColumnTypEnum.TEXT, FilterOperationEnum.MATCH, null, []);
        let userNameFilterColumn = new FilterProperty('USERS.userName', 'user:userName', ColumnTypEnum.TEXT, FilterOperationEnum.MATCH, null, []);
        let countryFilterColumn = new FilterProperty('USERS.country', 'user:cntryId', ColumnTypEnum.DROPDOWN_MULTI, FilterOperationEnum.IN_LONG_LIST, this.loadCountryList(), []);


        // Object to create Filter for.
        this.filterPropertiesArr.push(fNameFilterColumn);
        this.filterPropertiesArr.push(lNameFilterColumn);
        this.filterPropertiesArr.push(userNameFilterColumn);
        this.filterPropertiesArr.push(countryFilterColumn);
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





