import {Component, OnInit, ViewChild, HostListener, ElementRef, AfterViewInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AppSettings} from '../../app.settings';
import {Settings} from '../../app.settings.model';
import {Mail} from './mail.model';
import {MailboxService} from './mailbox.service';
import {AbstractDataModelController} from "../../appCommon/controllers/AbstractDataModelController";
import {SortCriteria} from 'src/app/appCommon/models/dto/SortCriteria';
import {RepServices} from "../../services/repServices/RepServices";
import {FilterCriteria} from "../../appCommon/models/dto/FilterCriteria";
import {FilterOperationEnum} from "../../appCommon/models/enum/FilterOperationEnum";
import {FilterProperty} from "../../appCommon/models/dto/FilterProperty";
import {ColumnTypEnum} from "../../appCommon/models/enum/ColumnTypEnum";
import {SortDirection} from "@swimlane/ngx-datatable";
import {PartiesEnum} from "../../models/utilites/PartiesEnum";
import {LocalSelectItem} from "../../appCommon/models/dto/LocalSelectItem";
import {DropDownService} from "../../services/commonServices/drop-down-service.service";
import {AuthService} from "../../AuthModule/AuthService";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-mailbox',
    templateUrl: './mailbox.component.html',
    styleUrls: ['./mailbox.component.scss'],
    providers: [MailboxService]
})

export class MailboxComponent extends AbstractDataModelController<Mail> {
    public formats = [
        'background',
        'bold',
        'color',
        'font',
        'code',
        'italic',
        'link',
        'size',
        'strike',
        'script',
        'underline',
        'blockquote',
        'header',
        'indent',
        'list',
        'align',
        'direction',
        'code-block',
        'formula',
        /*    'image',
            'video'*/
    ]

    @ViewChild('sidenav') sidenav: any;
    @ViewChild('message') messageInput: ElementRef;
    public settings: Settings;
    public sidenavOpen: boolean = true;
    public mails: Array<Mail>;
    public mail: Mail;
    public newMail: boolean;
    public type: string = 'all';
    public searchText: string;
    public form: FormGroup;
    public ticketsTypeList: LocalSelectItem[];
    public ticketDetailsList: Mail[];
    public loadingDet: boolean;
    public selectedMail: Mail;
    public replyEvent: boolean;
    public changeReadStatusEvent: boolean;
    public currentUserName: String;
    public partyId: number;
    public PARTY = PartiesEnum;
    @ViewChild('mailbox-content') private myScrollContainer: ElementRef;
    public routeTicketId: number;

    constructor(public appSettings: AppSettings, public repServices: RepServices,
                public formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router,
                public snackBar: MatSnackBar, public dropDownService: DropDownService,
                private mailboxService: MailboxService, public authService: AuthService) {
        super(mailboxService);
        this.router.routeReuseStrategy.shouldReuseRoute = function() {
            return false;
        };
        this.settings = this.appSettings.settings;
        this.partyId = authService.getUserParty();
        authService.getUserNameAuth().subscribe(data => {
            this.currentUserName = data.userName;
        })
    }

    prepareDisplayColumns(): string[] {
        return [];
    }


    addPermanentFilterColumns() {

    }

    searchForMail() {
        this.permanentFiltersObjValues = [];
        this.permanentFiltersObjValues.push(new FilterCriteria('ticketScNumber', this.searchText, FilterOperationEnum.MATCH));
        this.loadDataAndPublish();
    }

    prepareFiltersColumns() {
        /* let licenseNum = new FilterProperty('sv.licenseNum', 'licenseNum', ColumnTypEnum.TEXT, FilterOperationEnum.MATCH, null, []);
         this.filterPropertiesArr.push(licenseNum);*/

    }


    addPermanentSortColumn(): SortCriteria {
        return new SortCriteria('ticketId', SortDirection.asc);
    }

    viewData() {

    }

    editData() {

    }


    ngOnInit() {
        this.routeTicketId = this.route.snapshot.params['id'];
        if (this.routeTicketId != null) {
            this.permanentFiltersObjValues = [];
            this.permanentFiltersObjValues.push(new FilterCriteria('ticketId', this.routeTicketId, FilterOperationEnum.EQUAL));
        }
        this.loadDataAndPublish();
        if (window.innerWidth <= 992) {
            this.sidenavOpen = false;
        }
        this.form = this.formBuilder.group({
            'ticketTypeId': ['', Validators.required],
            'subject': ['', [Validators.required, Validators.maxLength(50)]],
            'message': ['', [Validators.required, Validators.maxLength(300)]],
        });

        this.dropDownService.getAllTicketTypes().subscribe(date => {
            this.ticketsTypeList = date;
        })
    }


    public openDetOfFirstItem() {
        if (this.dataSource && this.dataSource.data) {
            //this.searchText = this.dataSource.data[0].ticketScNumber;
            this.dataSource.data[0].selected = true;
            this.viewDetail(this.dataSource.data[0]);
        }
    }

    @HostListener('window:resize')
    public onWindowResize(): void {
        (window.innerWidth <= 992) ? this.sidenavOpen = false : this.sidenavOpen = true;
    }

    public getMails() {
        switch (this.type) {
            case 'all':
                if (this.routeTicketId) {
                    this.router.navigateByUrl("/support")
                } else {
                    this.loadDataAndPublish();
                }
                break;
            case 'starred':
                this.mails = this.mailboxService.getStarredMails();
                break;
            case 'sent':
                this.mails = this.mailboxService.getSentMails();
                break;
            case 'drafts':
                this.mails = this.mailboxService.getDraftMails();
                break;
            case 'trash':
                this.mails = this.mailboxService.getTrashMails();
                break;
            default:
                this.mails = this.mailboxService.getDraftMails();
        }
    }

    public viewDetail(mail: Mail) {
        this.mail = mail;
        this.deSelectAll();
        mail.selected = true;

        this.newMail = false;
        if (window.innerWidth <= 992) {
            this.sidenav.close();
        }
        this.loadingDet = true;
        this.mailboxService.loadTicketDetByTicketId(mail).subscribe(data => {
            this.ticketDetailsList = data;
            this.newMail = false;
            this.loadingDet = false;
        })
        this.scrollToTop();
    }

    public compose() {
        this.mail = null;
        this.newMail = true;
        this.form.controls['ticketTypeId'].setValue(null);
        this.form.controls['ticketTypeId'].enable();
        this.form.controls['subject'].setValue(null);
        this.form.controls['subject'].enable();
        this.form.reset();
        this.deSelectAll();
    }

    public closeTicket(mail: Mail) {
        this.dataSource.data.forEach(item => {
                if (item.ticketId == mail.ticketId)
                    item.status = 1
            }
        )

        this.mailboxService.closeTicket(mail).subscribe(data => {
            this.loadDataAndPublish();
        })

    }

    deSelectAll() {
        if (this.dataSource)
            this.dataSource.data.forEach(item => {
                item.selected = false
            })
    }

    public prepareReply() {
        this.form.controls['ticketTypeId'].setValue(this.mail.ticketTypeId);
        this.form.controls['ticketTypeId'].disable();
        this.form.controls['subject'].setValue(this.mail.subject);
        this.form.controls['subject'].disable();
        // this.messageInput.nativeElement.focus();
        this.newMail = true;
        this.replyEvent = true;
        this.scrollToBottom();
    }

    replyAction(mail: Mail) {
        if (this.form.valid) {
            mail.ticketId = this.mail.ticketId;
            this.mailboxService.addNewTicketDet(mail).subscribe(data => {
                this.mailboxService.loadTicketDetByTicketId(mail).subscribe(data => {
                    this.ticketDetailsList = data;
                    this.newMail = false;
                    this.loadingDet = false;
                })
                this.resetForm();
                this.replyEvent = false;
                this.newMail = false;
                this.scrollToBottom();
            })

        }
    }

    cancelReply() {
        this.replyEvent = false;
        this.newMail = false;
        this.scrollToTop();

    }

    scrollToTop(): void {
        document.getElementById('mailbox-content').scrollTop = 0;
    }

    scrollToBottom(): void {
        try {
            document.getElementById('mailbox-content').scrollTop = document.getElementById('mailbox-content').scrollHeight;
        } catch (err) {
            console.error(err)
        }
    }


    public setAsRead(mail: Mail) {
        if (mail.unread == 1) {
            this.changeReadStatusEvent = true;
            mail.unread = 0;
            this.mailboxService.setAsRead(mail).subscribe(data => {
                    this.changeReadStatusEvent = false;
                },
                err => {
                    mail.unread = 1;
                })
        }
    }

    public setAsUnRead() {
        /*     this.mail.unread = true;*/
    }

    public delete() {
        /* this.mail.trash = true;
         this.mail.sent = false;
         this.mail.draft = false;
         this.mail.starred = false;
         this.getMails();
         this.mail = null;*/
    }

    public changeStarStatus() {
        /*        this.mail.starred = !this.mail.starred;
                this.getMails();*/
    }

    public restore() {
        /*        this.mail.trash = false;
                this.type = 'all';
                this.getMails();
                this.mail = null;*/
    }

    public onSubmit(mail) {
        if (this.form.valid) {
            this.mailboxService.addNewTicket(mail).subscribe(data => {
                this.loadDataAndPublish();
                this.resetForm();
                this.newMail = false;
            })

        }
    }

    public resetForm() {
        this.form.reset();
    }

    afterLoadData() {
        this.openDetOfFirstItem();
    }

}
