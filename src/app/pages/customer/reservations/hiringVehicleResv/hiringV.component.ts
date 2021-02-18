import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';

import {SortDirection} from '@swimlane/ngx-datatable';
import {MatDialog} from "@angular/material/dialog";
import {Observable} from "rxjs";
import {AbstractDataModelController} from "../../../../appCommon/controllers/AbstractDataModelController";
import {DropDownService} from "../../../../services/commonServices/drop-down-service.service";
import {ResrvService} from "../../../../services/publicServices/ResrvService";
import {FilterCriteria} from "../../../../appCommon/models/dto/FilterCriteria";
import {FilterOperationEnum} from "../../../../appCommon/models/enum/FilterOperationEnum";
import {FilterProperty} from "../../../../appCommon/models/dto/FilterProperty";
import {ColumnTypEnum} from "../../../../appCommon/models/enum/ColumnTypEnum";
import {SortCriteria} from "../../../../appCommon/models/dto/SortCriteria";
import {Vehicles} from "../../../../models/spServices/Vehicles";
import {HiringVDialogComponent} from "./hiringV-dialog.component";
import {LocalSelectItem} from "../../../../appCommon/models/dto/LocalSelectItem";
import {SvHiringReservation} from "../../../../models/DTO/SvHiringReservation";



@Component({
    selector: 'app-hiring-resv-v',
    templateUrl: './hiringV.component.html',
    encapsulation: ViewEncapsulation.None,

})

export class HiringVComponent extends AbstractDataModelController<SvHiringReservation> implements OnInit {
    public repId:number;
    constructor(
        public dialog: MatDialog, public dropDownServices: DropDownService,
        public service: ResrvService, public router: Router ) {
        super(service);
        this.formsManager.upsert('resrevationsHiringCust', this.filterComponentForm);

    }

    prepareDisplayColumns(): string[] {
       return ['reservationRefNumber','orgName','startDate', 'fromHour', 'toHour','hoursNumber','numberOfPersons','totalPrice', 'status','executeStatusStr', 'actions'];
    }


    addPermanentFilterColumns() {
        //approved Only
        // this.permanentFiltersObjValues.push(new FilterCriteria('status', 0, FilterOperationEnum.EQUAL));
    }

    prepareFiltersColumns() {
        let status = new FilterProperty('USERS.status', 'status', ColumnTypEnum.DROPDOWN, FilterOperationEnum.EQUAL, this.loadStatusList(), []);
        let excuteStatus = new FilterProperty('resv.exec.status', 'executionStatus', ColumnTypEnum.DROPDOWN, FilterOperationEnum.EQUAL, this.loadExcutetStatusListBits(), []);
        let refNum = new FilterProperty('resv.number', 'reservationRefNumber', ColumnTypEnum.TEXT, FilterOperationEnum.EQUAL, null, []);
        let date = new FilterProperty('resv.date', 'startDate', ColumnTypEnum.DATE_GEO, FilterOperationEnum.EQUAL, null, []);

        this.filterPropertiesArr.push(refNum);
        this.filterPropertiesArr.push(date);
        this.filterPropertiesArr.push(status);
        this.filterPropertiesArr.push(excuteStatus);



    }


    addPermanentSortColumn(): SortCriteria {
        return new SortCriteria('id', SortDirection.asc);
    }

    editData() {
    }

    viewResv( resv: SvHiringReservation) {
        let dialogRef = this.dialog.open(HiringVDialogComponent, {
            data: resv,
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

    public loadStatusList(): Array<LocalSelectItem> {
        let options = Array<LocalSelectItem>();
        // options.push(new LocalSelectItem(this.msgsService.getMessageTranslation('USERS.status'),this.msgsService.getMessageTranslation('USERS.status'),9))
        options.push(new LocalSelectItem('بانتظار الموافقة', 'Pending', 1));
        options.push(new LocalSelectItem('مقبول', 'Approved', 2));
        options.push(new LocalSelectItem('مرفوض', 'Rejected', 3));
        return options;
    }

    public loadExcutetStatusListBits(): Array<LocalSelectItem> {
        let options = Array<LocalSelectItem>();
        // options.push(new LocalSelectItem(this.msgsService.getMessageTranslation('USERS.status'),this.msgsService.getMessageTranslation('USERS.status'),9))
        options.push(new LocalSelectItem('بالانتظار ', 'Pending', 1));
        options.push(new LocalSelectItem('تم التنفيذ', 'Done', 2));
        options.push(new LocalSelectItem('ملغي من العميل', 'Cancelled', 3));
        options.push(new LocalSelectItem('ملغي من مزود الخدمة', 'Cancelled', 4));
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





