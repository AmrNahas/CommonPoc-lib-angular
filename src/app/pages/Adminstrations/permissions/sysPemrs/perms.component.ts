import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AbstractDataModelController} from '../../../../appCommon/controllers/AbstractDataModelController';
import {SysPermission} from '../../../../models/SysPermssions';
import {SortCriteria} from '../../../../appCommon/models/dto/SortCriteria';
import {UsersService} from '../../../users/users.service';
import {MatDialog} from '@angular/material/dialog';
import {DropDownService} from '../../../../services/commonServices/drop-down-service.service';
import {Router} from '@angular/router';
import {SysPermsService} from '../../../../services/sysPermsServices/sysPermsService.service';
import {FilterProperty} from '../../../../appCommon/models/dto/FilterProperty';
import {ColumnTypEnum} from '../../../../appCommon/models/enum/ColumnTypEnum';
import {FilterOperationEnum} from '../../../../appCommon/models/enum/FilterOperationEnum';
import {SortDirection} from '@swimlane/ngx-datatable';
import {Observable} from 'rxjs';
import {LocalSelectItem} from '../../../../appCommon/models/dto/LocalSelectItem';
import {IdUserNameDto} from '../../../../models/DTO/IdUserNameDto';
import {AuthService} from '../../../../AuthModule/AuthService';
import {MessagesService} from '../../../../appCommon/utility/MessagesService';


@Component({
    selector: 'app-perms',
    templateUrl: './perms.component.html',
    encapsulation: ViewEncapsulation.None,
    providers: [UsersService]
})


export class Perms extends AbstractDataModelController<SysPermission> implements OnInit {
    constructor(
        public dialog: MatDialog, public dropDownServices: DropDownService,
        public permsService: SysPermsService, public router: Router, public authService: AuthService ,public  msgService:MessagesService  ) {
        super(permsService);
        this.formsManager.upsert('perms', this.filterComponentForm);
    }

    prepareDisplayColumns(): string[] {
        return ['id', 'name', 'serviceName', 'party', 'status', 'actions'];
    }

    addPermanentFilterColumns() {

    }

    addPermanentSortColumn(): SortCriteria {
        return new SortCriteria('id', SortDirection.asc);
    }

    editData() {
    }


    prepareFiltersColumns() {
        let nameFilterColumn = new FilterProperty('USERS.name', 'nameAr', ColumnTypEnum.TEXT, FilterOperationEnum.MATCH, null, []);
        // let codeFilterColumn = new FilterProperty('GENERIC.code', 'code', ColumnTypEnum.TEXT, FilterOperationEnum.EQUAL, null, []);
        let serviceFilterColumn = new FilterProperty('GENERIC.serviceName', 'serviceId', ColumnTypEnum.DROPDOWN, FilterOperationEnum.EQUAL, this.loadServicesItems(), []);
        let partyFilterColumn = new FilterProperty('GENERIC.party', 'service:partyId', ColumnTypEnum.DROPDOWN, FilterOperationEnum.EQUAL, this.loadPartiesItems(), []);
        let statusFilterColumn = new FilterProperty('USERS.status', 'status', ColumnTypEnum.DROPDOWN, FilterOperationEnum.EQUAL, this.dropDownServices.loadStatusList(), []);

        this.filterPropertiesArr.push(nameFilterColumn);
        // this.filterPropertiesArr.push(codeFilterColumn);
        this.filterPropertiesArr.push(serviceFilterColumn);
        this.filterPropertiesArr.push(partyFilterColumn);
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

    stopPermission(id: number) {
        let dto: IdUserNameDto = new IdUserNameDto(id, this.authService.currentUserValue.userName);
        this.permsService.deActivate(dto).subscribe((data) => {
                this.msgService.showInfoMessageLocal("registration.Updating.profile.success");
                this.loadDataAndPublish();
            },
            error => {
                this.msgService.showErrorMessage(error.error.messageAr);
            }
        );

    }

    activatePerm(id: number) {
        let dto: IdUserNameDto = new IdUserNameDto(id, this.authService.currentUserValue.userName);
        this.permsService.activatePerm(dto).subscribe((data) => {
                this.msgService.showInfoMessageLocal("registration.Updating.profile.success");
                this.loadDataAndPublish();
            },
            error => {
                this.msgService.showErrorMessage(error.error.messageAr);
            }
        );

    }


// to prevent reload
    /*   @HostListener("window:beforeunload", ["$event"])
         unloadHandler(event: Event) {
            event.returnValue = false;
        }*/


     ngOnInit(): void {
      /*  const perm = ["ADMIN", "EDITOR"];//this.authService.currentUserValue.permissions
        this.permissionsService.loadPermissions(perm);*/
        this.loadDataAndPublish();
/*       console.log(this.permissionsService.getPermissions())
        //save the search values*/
    }

}





