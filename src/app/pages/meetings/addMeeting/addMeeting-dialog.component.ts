import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {AcceptValidator, MaxSizeValidator} from "@angular-material-components/file-input";
import {Settings} from "../../../app.settings.model";
import {UtilityController} from "../../../appCommon/controllers/UtilityController";
import {LocalSelectItem} from "../../../appCommon/models/dto/LocalSelectItem";
import {Meeting} from "../../../models/Meeting";
import {MeetingService} from "../../../services/MeetingService";
import {MessagesService} from "../../../appCommon/utility/MessagesService";
import {AppSettings} from "../../../app.settings";
import {AuthService} from "../../../AuthModule/AuthService";
import {DropDownService} from "../../../services/commonServices/drop-down-service.service";
import {Router} from "@angular/router";
import {MeetingAgenda} from "../../../models/MeetingAgenda";


@Component({
    selector: 'app-addMeeting-dialog',
    templateUrl: './addMeeting-dialog.component.html',

})
export class AddMeetingDialogComponent extends UtilityController implements OnInit {
    public form: FormGroup;
    masterPicFileControl: FormControl;
    licenseFileControl: FormControl;
    ownerShipFileControl: FormControl;
    hiringFileControl: FormControl;
    public submitted: boolean;
    public sysCountries: LocalSelectItem[];
    public svTypes: LocalSelectItem[];
    public cities: LocalSelectItem[];
    public masterPicFile: File;
    maxSize = 160;

    public timesListTo: LocalSelectItem[];

    constructor(public dialogRef: MatDialogRef<AddMeetingDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public sv: Meeting, public service: MeetingService, public dialog: MatDialog,
                public fb: FormBuilder, private router: Router, public  messagesService: MessagesService,
                private dropDownServices: DropDownService, private authService: AuthService, public appSettings: AppSettings) {
        super();
        this.todoList = Array<any>();
        this.masterPicFile = null;
        this.form = this.fb.group({
            title: [null, Validators.compose([Validators.required])],
            description: [null, Validators.compose([Validators.required])],
            place: [null, Validators.compose([Validators.required])],
            date_d: [null, Validators.compose([Validators.required])],
            time: [null, Validators.compose([Validators.required])],
        });
        this.timesListTo = [];


    }


    prepareTimesFromList() {
        for (let i = 1; i < 24; i++) {
            let name: string = i > 12 ? i - 12 + ":00  " + "مساءا " : i + ":00 " + " صباحا ";
            let item: LocalSelectItem = new LocalSelectItem(name, name, i);
            this.timesListTo.push(item);
        }
    }

    trackByFn(index: any, item: any) {
        return index;
    }

    ngOnInit() {
        this.prepareTimesFromList()
        this.sv = new Meeting();
    }


    removeMasterPicFile(control: FormControl) {
        control.setValue(null);
    }


    close(): void {
        this.dialogRef.close();
    }


    public saveNewMeeting() {
        if (this.form.valid && this.masterPicFileControl.valid && this.ownerShipFileControl.valid) {
            this.submitted = true;
            let masterPhoto: File = this.masterPicFileControl.value;
            let ownershipPhoto: File = this.ownerShipFileControl.value;
            this.form.disable();
            this.sv = this.form.value;

            this.service.saveObj(this.sv).subscribe(
                data => {
                    this.messagesService.showInfoMessageLocal('GENERIC.server.success');
                    this.dialogRef.close();
                },
                error => {
                    this.form.enable();
                    this.messagesService.showErrorMessage(error.error.messageAr);
                    this.submitted = false;
                }
            );


        } else {
            this.messagesService.showErrorMessageLocal('registration.submit.not.valid.error');
        }
        this.submitted = false;
    }


    public settings: Settings;
    public todoList: Array<any>;
    public newTodoText: string = '';


    public getNotDeleted() {
        return this.todoList.filter((item: any) => {
            return !item.deleted
        })
    }

    public addToDoItem($event) {
        if (($event.which === 1 || $event.which === 13) && this.newTodoText.trim() != '') {
            this.todoList.unshift({
                text: this.newTodoText
            });
            this.newTodoText = '';
        }
    }

    onSubmit(value: Meeting) {
        if (this.form.valid ) {
           /* let agendaList = new Array<MeetingAgenda>();
            this.todoList.filter((item: any) => {
                if (!item.deleted) {
                    let agendaItem = new MeetingAgenda();
                    agendaItem.comment = item;
                    agendaList.push(agendaItem);
                }
            })

            value.meetingAgenda = agendaList;*/
            console.warn(value)
            value.date=value.date_d.getTime();
            this.service.saveObj(value).subscribe(
                data => {
                    this.messagesService.showInfoMessageLocal('GENERIC.server.success');
                    this.dialogRef.close();
                },
                error => {
                    this.form.enable();
                    this.messagesService.showErrorMessage(error.error.messageAr);
                    this.submitted = false;
                }
            );
        } else
            this.messagesService.showErrorMessageLocal('registration.submit.not.valid.error');

    }


}
