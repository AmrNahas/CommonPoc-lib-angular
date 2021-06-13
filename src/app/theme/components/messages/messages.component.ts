import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatMenuTrigger} from '@angular/material/menu';
import {WebSocketService} from "../../../notifications/WebSocketService ";
import {NotificationsService} from "../../../services/userNotifications/NotificationsService ";
import {UserNotifications} from "../../../models/DTO/UserNotifications";
import {MatDialog} from "@angular/material/dialog";
import {AppSettings} from "../../../app.settings";
import {Router} from "@angular/router";
import {UtilityController} from "../../../../../projects/app-common/src/lib/appCommon/controllers/UtilityController";
import {MessagesService} from "../../../../../projects/app-common/src/lib/appCommon/utility/MessagesService";
import {AuthService} from "../../../AuthModule/AuthService";


// providers: [MessagesService]
@Component({
    selector: 'app-messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.scss'],
    encapsulation: ViewEncapsulation.None,

})
export class MessagesComponent extends UtilityController implements OnInit {
    @ViewChild(MatMenuTrigger, {static: true}) trigger: MatMenuTrigger;
    public notificationsNum: number;
    public selectedTab: number = 1;
    public notificationsList: Array<UserNotifications>;
    public files: Array<Object>;
    public meetings: Array<Object>;
    public notifications: any;
    public userName: String;
    public loading: boolean;

    // private messagesService: MessagesService, old
    constructor( public messagesService:MessagesService,public appSettings: AppSettings,
                 public dialog: MatDialog, private webSocketService: WebSocketService, private authService: AuthService,
                 private  notificationsService: NotificationsService ,public route:Router) {
        // this.messages = messagesService.getMessages();
        super();
  /*      this.files = messagesService.getFiles();
        this.meetings = messagesService.getMeetings();*/
        this.authService.getUserNameAuth().subscribe(item => {
            if (item) {
                this.userName = item.userName;
                this.subscribeNotifications();

            }
        })

    }

    ngOnInit() {
        // Open connection with server socket
        /*  if(this.userName) {
              let stompClient = this.webSocketService.connect();
              stompClient.connect({}, frame => {
                  // Subscribe to notification topic

                  stompClient.subscribe('/user/'+this.userName+'/queue/notification', notifications => {
                      // /topic/notification
                      console.warn(notifications.body);
                      // Update notifications attribute with the recent messsage sent from the server
                      this.notifications = JSON.parse(notifications.body).count;
                      // console.warn("notifications:"+this.notifications);
                  })
              });
          }*/
    }

    subscribeNotifications() {
        let stompClient = this.webSocketService.connect();
        stompClient.connect({}, frame => {
            // Subscribe to notification topic

            stompClient.subscribe('/user/' + this.userName + '/queue/notification', notifications => {
                // /topic/notification
                // console.warn(notifications.body);
                // Update notifications attribute with the recent messsage sent from the server
                let num: number = JSON.parse(notifications.body).count;
                this.notifications = num > 0 ? num : null;
            })
        });


    }

    openMessagesMenu() {
        this.trigger.openMenu();
        this.selectedTab = 0;
        this.getNotificationForUser()
    }

    getNotificationForUser() {
        try {
            this.loading = true;
            this.notificationsService.loadNotificationsByUser().subscribe(list => {
                this.notificationsList = list;
                this.loading = false;
            })
        } catch (e) {
            this.loading = false;

        }
    }

    updateNotificationStatusForUser(notificationUserMapId: number) {
        try {
            this.notificationsService.updateNotificationStatus(notificationUserMapId).subscribe(list => {

            })
        } catch (e) {

        }
    }


    onMouseLeave() {
        this.trigger.closeMenu();
    }

    stopClickPropagate(event: any) {
        event.stopPropagation();
        event.preventDefault();
    }


    viewInfo( notification:UserNotifications) {
        this.trigger.closeMenu();
        if(notification.userReadStatus==0) {
            notification.userReadStatus=1;
            this.updateNotificationStatusForUser(notification.id);
        }
        this.openNotificationDetInfo(notification);
    }

   public openNotificationDetInfo( notification:UserNotifications)
   {
    /*   if (notification.type == Constants.NOTIFICATIONS_USER_TYPE_RESERVATIONS) {
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

       }else  if(notification.type == Constants.NOTIFICATIONS_USER_TYPE_TICKET_MESSAGE){
           this.route.navigate(["/support",notification.recordId])
       }*/
   }

}
