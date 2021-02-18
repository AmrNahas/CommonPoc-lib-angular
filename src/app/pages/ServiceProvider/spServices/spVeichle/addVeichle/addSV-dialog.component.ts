import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {UsersService} from 'src/app/services/usersServices/users.service';
import {DropDownService} from 'src/app/services/commonServices/drop-down-service.service';

import {Router} from '@angular/router';
import {VehiclesService} from "../../../../../services/sp/vehiclesService";
import {AuthService} from "../../../../../AuthModule/AuthService";
import {MessagesService} from "../../../../../appCommon/utility/MessagesService";
import {Vehicles} from "../../../../../models/spServices/Vehicles";
import {LocalSelectItem} from "../../../../../appCommon/models/dto/LocalSelectItem";
import {UtilityController} from "../../../../../appCommon/controllers/UtilityController";
import {AttImgDialogComponent} from "../../../../../appCommon/CustomeComponents/attachmentPreview/att-img-dialog.component";
import {AppSettings} from "../../../../../app.settings";
import {AcceptValidator, MaxSizeValidator} from "@angular-material-components/file-input";


@Component({
    selector: 'app-addSv-dialog',
    templateUrl: './addSV-dialog.component.html',
    styleUrls: ['./addSV-dialog.component.scss']

})
export class AddSVDialogComponent extends UtilityController implements OnInit {
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

    constructor(public dialogRef: MatDialogRef<AddSVDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public sv: Vehicles, public service: VehiclesService, public dialog: MatDialog,
                public fb: FormBuilder, private router: Router, public  messagesService: MessagesService,
                private dropDownServices: DropDownService, private authService: AuthService, public appSettings: AppSettings) {
        super();
        this.masterPicFile = null;
        this.form = this.fb.group({
            nameAr: [null, Validators.compose([Validators.required])],
            nameEn: [null, Validators.compose([Validators.required])],
            typeId: [null, Validators.compose([Validators.required])],
            countryId: [null, Validators.compose([Validators.required])],
            cityId: [null, Validators.compose([Validators.required])],
            licenseNum: [null, Validators.compose([Validators.required,Validators.maxLength(15), Validators.pattern('[0-9]+')])],
            descriptionAr: [null, Validators.compose([Validators.required])],
            descriptionEn: [null, Validators.compose([Validators.required])],
            maxSeatsNum: [null, Validators.compose([Validators.required,Validators.maxLength(4), Validators.pattern('[0-9]+')])],
            pricePerHour: [null, Validators.compose([Validators.required,Validators.maxLength(6), Validators.pattern('[0-9]+')])],
            minHourForHire: [null, Validators.compose([Validators.required,Validators.maxLength(3), Validators.pattern('[0-9]+')])],
            locationAddress: [null, Validators.compose([Validators.required])],
            hasToiletValue: [null],
            hasKitchenValue: [null],
            hasEmergencyToolsValue: [null],
            hasFishingToolsValue: [null],
        });

        // Validators.compose([Validators.required ,AcceptValidator('image/*'),MaxSizeValidator(this.maxSize * 1024)])
        this.masterPicFileControl = new FormControl(null
        )


        // Validators.required,AcceptValidator('image/*,.pdf'),MaxSizeValidator(this.maxSize * 1024)
        this.ownerShipFileControl = new FormControl(null, [])

        this.hiringFileControl = new FormControl(null, [
            Validators.required,
            MaxSizeValidator(this.maxSize * 1024)
        ])

        this.licenseFileControl = new FormControl(null, [
            Validators.required,
            MaxSizeValidator(this.maxSize * 1024)
        ])


    }


    trackByFn(index: any, item: any) {
        return index;
    }

    ngOnInit() {
        this.prepareCountriesList();
        this.prepareSvTypesList();
        this.sv = new Vehicles();
    }


    prepareCountriesList() {
        this.dropDownServices.getAllCountriesDropDownValues().subscribe((data: LocalSelectItem[]) => {
            this.sysCountries = data;
        });
    }

    prepareSvTypesList() {
        this.dropDownServices.getAllSvTypesList().subscribe((data: LocalSelectItem[]) => {
            this.svTypes = data;
        });
    }

    prepareCitiesList() {
        var cntryId: any = this.form.controls.countryId.value;
        if (cntryId) {
            this.prepareCitiesByCountry(cntryId);
        }
    }

    prepareCitiesByCountry(cntryId) {
        this.form.controls.cityId.setValue(null);
        this.dropDownServices.getAllCitiesForCountryDropDown(cntryId).subscribe((data: LocalSelectItem[]) => {
            this.cities = data;
        });
    }


    fileMasterPicView(control: FormControl) {
        let value = this.masterPicFileControl.value;
        let dialogRef = this.dialog.open(AttImgDialogComponent, {
            data: control.value,
            disableClose: true,
            direction: this.appSettings.settings.rtl ? 'rtl' : 'ltr',
        });
    }


    removeMasterPicFile(control: FormControl) {
        control.setValue(null);
    }


    close(): void {
        this.dialogRef.close();
    }


    public saveNewSv() {
        if (this.form.valid && this.masterPicFileControl.valid && this.ownerShipFileControl.valid) {
            this.submitted = true;
            let masterPhoto: File = this.masterPicFileControl.value;
            let ownershipPhoto: File = this.ownerShipFileControl.value;
            this.form.disable();
            this.sv = this.form.value;

            this.service.addVehicleWithAttachments(this.sv, masterPhoto, ownershipPhoto).subscribe(
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


}
