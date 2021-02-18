import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';

import {SortDirection} from '@swimlane/ngx-datatable';
import {MatDialog} from "@angular/material/dialog";
import {UsersService} from "../../../../users/users.service";
import {AbstractDataModelController} from "../../../../../appCommon/controllers/AbstractDataModelController";
import {DropDownService} from "../../../../../services/commonServices/drop-down-service.service";
import {FilterOperationEnum} from "../../../../../appCommon/models/enum/FilterOperationEnum";
import {SortCriteria} from "../../../../../appCommon/models/dto/SortCriteria";
import {FilterProperty} from "../../../../../appCommon/models/dto/FilterProperty";
import {ColumnTypEnum} from "../../../../../appCommon/models/enum/ColumnTypEnum";
import {LocalSelectItem} from "../../../../../appCommon/models/dto/LocalSelectItem";
import {Observable} from "rxjs";
import {Vehicles} from "../../../../../models/spServices/Vehicles";
import {VehiclesService} from "../../../../../services/sp/vehiclesService";
import {PartiesEnum} from "../../../../../models/utilites/PartiesEnum";
import {FilterCriteria} from "../../../../../appCommon/models/dto/FilterCriteria";
import {AddSVDialogComponent} from "../addVeichle/addSV-dialog.component";
import {ViewSVDialogComponent} from "./viewSV-dialog.component";


@Component({
    selector: 'app-Approved-vehicles',
    templateUrl: './spApprovedVeichlesList.component.html',
    encapsulation: ViewEncapsulation.None,

})

export class SpApprovedVeichlesListComponent extends AbstractDataModelController<Vehicles> implements OnInit {
    public repId:number;
    constructor(
        public dialog: MatDialog, public dropDownServices: DropDownService,
        public service: VehiclesService, public router: Router ) {
        super(service);
        this.formsManager.upsert('approvedVeichles', this.filterComponentForm);

    }

    prepareDisplayColumns(): string[] {
       return ['nameAr', 'nameEn', 'type','licenseNum', 'status', 'actions'];
    }


    addPermanentFilterColumns() {
        //approved Only
        this.permanentFiltersObjValues.push(new FilterCriteria('status', 0, FilterOperationEnum.EQUAL));
    }

    prepareFiltersColumns() {
        let licenseNum = new FilterProperty('sv.licenseNum', 'licenseNum', ColumnTypEnum.TEXT, FilterOperationEnum.MATCH, null, []);
        let status = new FilterProperty('USERS.status', 'status', ColumnTypEnum.DROPDOWN, FilterOperationEnum.EQUAL, this.loadStatusListBits(), []);
        let nameArFilterColumn = new FilterProperty('sv.nameAr', 'nameAr', ColumnTypEnum.TEXT, FilterOperationEnum.MATCH, null, []);
        let typeFilterColumn = new FilterProperty('sv.type', 'typeId', ColumnTypEnum.DROPDOWN_MULTI, FilterOperationEnum.IN_LONG_LIST, this.loadSvTypes(), []);
       /* let countryFilterColumn = new FilterProperty('USERS.country', 'countryId', ColumnTypEnum.DROPDOWN_MULTI, FilterOperationEnum.IN_LONG_LIST, this.loadCountryList(), []);
        let cityFilterColumn = new FilterProperty('registration.city', 'cityId', ColumnTypEnum.DROPDOWN_MULTI, FilterOperationEnum.IN_LONG_LIST, this.loadCityList(), []);
*/
        // Object to create Filter for.
        this.filterPropertiesArr.push(typeFilterColumn);
        this.filterPropertiesArr.push(licenseNum);
    /*    this.filterPropertiesArr.push(countryFilterColumn);
        this.filterPropertiesArr.push(cityFilterColumn);*/
        this.filterPropertiesArr.push(nameArFilterColumn);
         this.filterPropertiesArr.push(status);
    }


    addPermanentSortColumn(): SortCriteria {
        return new SortCriteria('id', SortDirection.asc);
    }

    editData() {
    }

    viewSv( vehicle:Vehicles) {
        let sv =new Vehicles();
        let dialogRef = this.dialog.open(ViewSVDialogComponent, {
            data: vehicle,
            disableClose: true,
            height: '500px',
            width: '900px',
            direction: this.appSettings.settings.rtl ? 'rtl' : 'ltr',
        });
    }

/*
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
*/

  /*  activateUser(id: number) {
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

    }*/

   /* editUserPermission(id: number) {
       let dialogRef = this.dialog.open(EditSpUsersPemDialogComponent, {
            data: id,
            disableClose: true,
            direction: this.appSettings.settings.rtl ? 'rtl' : 'ltr',
        });

    }*/





    public loadStatusListBits(): Array<LocalSelectItem> {
        let options = Array<LocalSelectItem>();
        // options.push(new LocalSelectItem(this.msgsService.getMessageTranslation('USERS.status'),this.msgsService.getMessageTranslation('USERS.status'),9))
        options.push(new LocalSelectItem(' فعال', 'Active', 0));
        options.push(new LocalSelectItem('غير فعال', 'InActive', 1));
        return options;
    }

    public loadRequestStatusListBits(): Array<LocalSelectItem> {
        let options = Array<LocalSelectItem>();
        // options.push(new LocalSelectItem(this.msgsService.getMessageTranslation('USERS.status'),this.msgsService.getMessageTranslation('USERS.status'),9))
        options.push(new LocalSelectItem('بانتظار الموافقة', 'Active', 1));
        options.push(new LocalSelectItem('مقبول', 'InActive', 2));
        options.push(new LocalSelectItem('مرفوض', 'InActive', 3));

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

    public loadSvTypes(): Observable<Array<LocalSelectItem>> {
        return this.dropDownServices.getAllSvTypesList();
    }

    public loadCityList(): Observable<Array<LocalSelectItem>> {
        return this.dropDownServices.getAllCitiesForCountryDropDown(1);
    }

    viewData() {
    }

    editRoles() {

    }

    viewDataInDetails( ) {
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





