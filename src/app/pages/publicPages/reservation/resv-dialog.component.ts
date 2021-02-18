import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';


import {Router} from '@angular/router';

import {AcceptValidator, MaxSizeValidator} from "@angular-material-components/file-input";
import {UtilityController} from "../../../appCommon/controllers/UtilityController";
import {LocalSelectItem} from "../../../appCommon/models/dto/LocalSelectItem";
import {VehiclesService} from "../../../services/sp/vehiclesService";
import {ResrvService} from "../../../services/publicServices/ResrvService";
import {Vehicles} from "../../../models/spServices/Vehicles";
import {DropDownService} from "../../../services/commonServices/drop-down-service.service";
import {AuthService} from "../../../AuthModule/AuthService";
import {AppSettings} from "../../../app.settings";
import {MessagesService} from "../../../appCommon/utility/MessagesService";
import {SvHiringReservationDto} from "../../../models/DTO/SvHiringReservationDto";


@Component({
    selector: 'app-resv-dialog',
    templateUrl: './resv-dialog.component.html',
    styleUrls: ['./resv-dialog.component.scss']

})
export class ResvDialogComponent extends UtilityController implements OnInit {
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
    public timesListFrom: LocalSelectItem[];
    public personsNumList: number[];
    public timesListTo: LocalSelectItem[];


    public hoursNum: number;
    public price: number;
    public vat: number;
    public priceWithVat: number;

    constructor(public dialogRef: MatDialogRef<ResvDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public sv: Vehicles, public service: ResrvService, public dialog: MatDialog,
                public fb: FormBuilder, private router: Router, public  messagesService: MessagesService,
                private dropDownServices: DropDownService, private authService: AuthService, public appSettings: AppSettings) {
        super();
        this.form = this.fb.group({
            date: [null, Validators.compose([Validators.required])],
            numOfPersons: [null, Validators.compose([Validators.required])],
            /*         hoursNum: [null, Validators.compose([Validators.required])],*/
            from: [null, Validators.compose([Validators.required])],
            to: [null, Validators.compose([Validators.required])],
            /*    price: [null, Validators.compose([Validators.required])],
                vat: [null, Validators.compose([Validators.required])],
                priceWithVat: [null, Validators.compose([Validators.required])],*/
        });


    }


    trackByFn(index: any, item: any) {
        return index;
    }

    ngOnInit() {
        this.timesListFrom = [];
        this.timesListTo = [];
        this.personsNumList = [];
        this.preparePersonsNumList()
        this.prepareTimesFromList();
        this.prepareTimesToList()
    }


    close(): void {
        this.dialogRef.close();
    }


    public saveNewSv() {
        if (this.form.valid) {
            this.submitted = true;
            this.form.disable();
            let numOfPers: number = this.form.controls['numOfPersons'].value;
            let fromHour: number = this.form.controls['from'].value;
            let toHour: number = this.form.controls['to'].value;
            let custId: number = this.authService.currentUserValue.id;
            let date: Date = this.form.controls['date'].value;
            console.log(date.getTime());
            console.log(date);
            let svResvDto: SvHiringReservationDto = new SvHiringReservationDto(custId, numOfPers, this.hoursNum, fromHour, toHour, this.sv.id, this.priceWithVat, this.vat, this.price,date.getTime())
            this.service.addNewHireReservationForVehicle(svResvDto).subscribe(
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


    prepareTimesFromList() {
        for (let i = 6; i < 18; i++) {
            let name: string = i > 12 ? i - 12 + ":00  " + "مساءا " : i + ":00 " + " صباحا ";
            let item: LocalSelectItem = new LocalSelectItem(name, name, i);
            this.timesListFrom.push(item);
        }
    }

    prepareTimesToList() {
        for (let i = 6; i < 18; i++) {
            let name: string = i > 12 ? i - 12 + ":00  " + "مساءا " : i + ":00 " + " صباحا ";
            let item: LocalSelectItem = new LocalSelectItem(name, name, i);
            this.timesListFrom.push(item);
        }
    }

    preparePersonsNumList() {
        for (let i = 1; i <= this.sv.maxSeatsNum; i++)
            this.personsNumList.push(i);
    }

    changeFromHour() {
        this.timesListTo = [];
        let x = this.form.controls['from'].value;
        for (let i = x + 1; i < 18; i++) {
            let name: string = i > 12 ? i - 12 + ":00  " + "مساءا " : i + ":00 " + " صباحا ";
            let item: LocalSelectItem = new LocalSelectItem(name, name, i);
            this.timesListTo.push(item);
        }

        this.changeToHour();
    }

    changeToHour() {

        let from = this.form.controls['from'].value;
        let to = this.form.controls['to'].value;
        if (from && to) {
            this.hoursNum = to - from;
            if (this.sv.minHourForHire < this.hoursNum)
                this.price = this.hoursNum * this.sv.pricePerHour;
            else
                this.price = this.sv.minHourForHire * this.sv.pricePerHour;
            this.vat = this.price * .15;
            this.priceWithVat = this.price + this.vat;
        } else {
            this.hoursNum = null;
            this.price = null;
            this.priceWithVat = null;
            this.vat = null;
        }

    }
}
