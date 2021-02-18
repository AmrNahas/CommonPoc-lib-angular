import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';

import {SortDirection} from '@swimlane/ngx-datatable';
import {MatDialog} from "@angular/material/dialog";
import {AbstractDataModelController} from "../../appCommon/controllers/AbstractDataModelController";
import {DropDownService} from "../../services/commonServices/drop-down-service.service";
import {FilterProperty} from "../../appCommon/models/dto/FilterProperty";
import {ColumnTypEnum} from "../../appCommon/models/enum/ColumnTypEnum";
import {FilterOperationEnum} from "../../appCommon/models/enum/FilterOperationEnum";
import {SortCriteria} from "../../appCommon/models/dto/SortCriteria";
import {LocalSelectItem} from "../../appCommon/models/dto/LocalSelectItem";
import {UserNotifications} from "../../models/DTO/UserNotifications";
import {NotificationsService} from "../../services/userNotifications/NotificationsService ";
import {Constants} from "../../models/utilites/Constants";
import {MessagesService} from "../../appCommon/utility/MessagesService";


@Component({
    selector: 'app-notifications',
    templateUrl: './userNotificationsComp.component.html',
    encapsulation: ViewEncapsulation.None,

})

export class UserNotificationsComp extends AbstractDataModelController<UserNotifications> implements OnInit {
    public repId:number;
    constructor(
        public dialog: MatDialog, public dropDownServices: DropDownService, private messagesService:MessagesService,
        public service: NotificationsService, public router: Router ) {
        super(service);
        this.formsManager.upsert('Notifications', this.filterComponentForm);

    }

    prepareDisplayColumns(): string[] {
       return ['seq','type','message', 'createdInLong', 'userReadStatus', 'actions'];
    }


    addPermanentFilterColumns() {
        //approved Only
        // this.permanentFiltersObjValues.push(new FilterCriteria('status', 0, FilterOperationEnum.EQUAL));
    }

    prepareFiltersColumns() {
        let status = new FilterProperty('USERS.status', 'status', ColumnTypEnum.DROPDOWN, FilterOperationEnum.EQUAL, this.loadStatusList(), []);

        this.filterPropertiesArr.push(status);



    }


    addPermanentSortColumn(): SortCriteria {
        return new SortCriteria('createdInDate', SortDirection.desc);
    }

    editData() {
    }

/*    viewInfo(notification:UserNotifications) {

        if(notification.userReadStatus==0) {
            notification.userReadStatus=1;
            this.updateNotificationStatusForUser(notification.id);
        }
        if (notification.type == Constants.NOTIFICATIONS_USER_TYPE_RESERVATIONS) {
            this.resvHiringService.getById(notification.recordId).subscribe(item => {
                    if (item) {
                        let dialogRef = this.dialog.open(HiringVResvSpDialogComponent, {
                            data: item,
                            disableClose: true,
                            height: '500px',
                            width: '900px',
                            direction: this.appSettings.settings.rtl ? 'rtl' : 'ltr',
                        });
                    }
                    else {
                        this.messagesService.showErrorMessageLocal("validation.front.error");
                    }
                },
                error=>{
                    this.messagesService.showErrorMessageLocal( "validation.front.error");
                } )

        }else {
            console.log(notification.type);
        }
    }*/

    updateNotificationStatusForUser(notificationUserMapId: number) {
        try {
            this.service.updateNotificationStatus(notificationUserMapId).subscribe(list => {

            })
        } catch (e) {

        }
    }


    public loadStatusListBits(): Array<LocalSelectItem> {
        let options = Array<LocalSelectItem>();
        // options.push(new LocalSelectItem(this.msgsService.getMessageTranslation('USERS.status'),this.msgsService.getMessageTranslation('USERS.status'),9))
        options.push(new LocalSelectItem(' فعال', 'Active', 0));
        options.push(new LocalSelectItem('غير فعال', 'InActive', 1));
        return options;
    }

    public loadStatusList(): Array<LocalSelectItem> {
        let options = Array<LocalSelectItem>();
        options.push(new LocalSelectItem('تمت المشاهدة', 'Seen', 1));
        options.push(new LocalSelectItem('بانتظار المشاهدة', 'not Seen', 0));
        return options;
    }



/*.mat-row {
    display: inline-flex;
    min-width: 100%;
}*/



    viewData() {
    }




    ngOnInit(): void {
        this.loadDataAndPublish();

    }

}





