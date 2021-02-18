import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';

import {SortDirection} from '@swimlane/ngx-datatable';
import {UsersService} from '../../../services/usersServices/users.service';
import {AbstractDataModelController} from '../../../appCommon/controllers/AbstractDataModelController';
import {SysPermission} from '../../../models/SysPermssions';
import {MatDialog} from '@angular/material/dialog';
import {DropDownService} from '../../../services/commonServices/drop-down-service.service';
import {FilterProperty} from '../../../appCommon/models/dto/FilterProperty';
import {ColumnTypEnum} from '../../../appCommon/models/enum/ColumnTypEnum';
import {FilterOperationEnum} from '../../../appCommon/models/enum/FilterOperationEnum';
import {SortCriteria} from '../../../appCommon/models/dto/SortCriteria';
import {SysRepUserServices} from '../../../services/repServices/SysRepUserServices';
import {SysRepUser} from '../../../models/DTO/SysRepUser';
import {FilterCriteria} from '../../../appCommon/models/dto/FilterCriteria';
import {PartiesEnum} from '../../../models/utilites/PartiesEnum';
import {LocalSelectItem} from '../../../appCommon/models/dto/LocalSelectItem';
import {Observable} from 'rxjs';
import {IdUserNameDto} from '../../../models/DTO/IdUserNameDto';
import {AuthService} from "../../../AuthModule/AuthService";
import {SpRepUserServices} from "../../../services/repServices/SpRepUserServices";
import {User} from "../../../models/user";
import {SpUserDialogComponent} from "./addSpUser/spUser-dialog.component";
import {EditSpUsersPemDialogComponent} from "./editSpUsersPerm/editSpUsersPem-dialog.component";


@Component({
    selector: 'app-sp-users',
    templateUrl: './spUser.component.html',
    encapsulation: ViewEncapsulation.None,
    providers: [UsersService]
})

export class SpUserComponent extends AbstractDataModelController<SysRepUser> implements OnInit {
    public repId:number;
    constructor(
        public dialog: MatDialog, public dropDownServices: DropDownService,
        public repUserService: SpRepUserServices,public usersService:UsersService, public router: Router ) {
        super(repUserService);
        this.formsManager.upsert('perms', this.filterComponentForm);
    }

    prepareDisplayColumns(): string[] {
        return ['firstName', 'lastName', 'userName', 'country', 'city', 'status','comments', 'actions'];
    }


    addPermanentFilterColumns() {
        this.permanentFiltersObjValues.push(new FilterCriteria('repInfo:repPartyId', PartiesEnum.SERVICE_PROVIDER, FilterOperationEnum.EQUAL));
        this.permanentFiltersObjValues.push(new FilterCriteria('repInfo:repId',this.authService.getCurrentUserRepId(), FilterOperationEnum.EQUAL));
    }


    addPermanentSortColumn(): SortCriteria {
        return new SortCriteria('repId', SortDirection.asc);
    }

    editData() {
    }

    public addUser( ) {
         let user =new User();
        let dialogRef = this.dialog.open(SpUserDialogComponent, {
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
            this.usersService.deActivateUserSp(dto).subscribe((data) => {
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
            this.usersService.activateUserSp(dto).subscribe((data) => {
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

    editUserPermission(user: User) {
       let dialogRef = this.dialog.open(EditSpUsersPemDialogComponent, {
            data: user,
            disableClose: true,
           height: '400px',
           width: '600px',
            direction: this.appSettings.settings.rtl ? 'rtl' : 'ltr',
        });

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

    viewDataInDetails(perm: SysPermission) {
        /*       this.data.storage = perm;
               this.router.navigate(["/admin/permsDet/"],this.data.storage);*/
        // this.router.config.find(r => r.path === '/admin/permsDet').data={ entity: perm };
        // route.data = { entity: perm };
        // this.router.navigateByUrl('/admin/permsDet');
        // this.router.navigate(['/admin/permsDet/',perm.id]);
        // this.router.navigate(['/admin/permsDet/',perm.id]);
        //  this.router.navigateByUrl('/path', { data: { entity: perm } })
//console.log(this.router.config.find(r => r.path === '/admin/perms'))
        /*          this.router.config.find(r => r.path === '/admin/permsDet').data = { entity: perm };
                this.router.navigateByUrl('/admin/permsDet');*/
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





