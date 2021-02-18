import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {Router} from '@angular/router';
import {VehiclesService} from "../../../../../services/sp/vehiclesService";
import {AuthService} from "../../../../../AuthModule/AuthService";
import {MessagesService} from "../../../../../appCommon/utility/MessagesService";
import {Vehicles} from "../../../../../models/spServices/Vehicles";
import {LocalSelectItem} from "../../../../../appCommon/models/dto/LocalSelectItem";
import {UtilityController} from "../../../../../appCommon/controllers/UtilityController";
import {AttImgDialogComponent} from "../../../../../appCommon/CustomeComponents/attachmentPreview/att-img-dialog.component";
import {AppSettings} from "../../../../../app.settings";
import {MaxSizeValidator} from "@angular-material-components/file-input";
import {DropDownService} from "../../../../../services/commonServices/drop-down-service.service";
import {PhotoDTO} from "../../../../../models/DTO/PhotoDTO";
import {VehiclesServiceMangment} from "../../../../../services/SvMangement/vehiclesServiceMangment";
import {AttImg64DialogComponent} from "../../../../../appCommon/CustomeComponents/attachmentBase64Preview/att-img64-dialog.component";
import {Constants} from "../../../../../models/utilites/Constants";


@Component({
    selector: 'app-SvRq-dialog',
    templateUrl: './svReq-dialog.component.html',
    styleUrls: ['./svReq-dialog.component.scss']

})
export class SvReqDialogComponent extends UtilityController implements OnInit {
    public form: FormGroup;
    masterPicFileControl: FormControl;
    ownerShipFileControl: FormControl;
    public submitted: boolean;
    public sysCountries: LocalSelectItem[];
    public svTypes: LocalSelectItem[];
    public cities: LocalSelectItem[];
    public documents: PhotoDTO[];
    public photos: PhotoDTO[];
    public Constants = Constants;
    public comments: string;
    public canDoAction: boolean;

    constructor(public dialogRef: MatDialogRef<SvReqDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public sv: Vehicles, public service: VehiclesService, public serviceSvMangment: VehiclesServiceMangment, public dialog: MatDialog,
                public fb: FormBuilder, private router: Router, public  messagesService: MessagesService,
                private dropDownServices: DropDownService, private authService: AuthService, public appSettings: AppSettings) {
        super();
        this.documents = [];
        this.photos = [];

    }


    ngOnInit() {
        this.prepareCountriesList();
        this.prepareSvTypesList();
        this.getSvBusinessDocuments();
        this.getSvPhotos();
        this.checkCanDoAction();
    }

    checkCanDoAction() {
        if (this.sv.reqStatus != 1)
            this.canDoAction = false;
        else {
            this.serviceSvMangment.checkSvRequestIsPending(this.sv.id).subscribe((data: number) => {
                if (data && data == 1) {
                    this.canDoAction = true;
                }
            });
        }
    }


    getSvBusinessDocuments() {
        this.serviceSvMangment.getSvBusinessDocuments(this.sv.id).subscribe((data: Array<PhotoDTO>) => {
            if (data) {
                data.forEach(item => {
                    this.documents.push(item)

                })
            }
        });
    }

    getSvPhotos() {
        this.serviceSvMangment.getSvPhotos(this.sv.id).subscribe((data: Array<PhotoDTO>) => {
            if (data) {
                data.forEach(item => {
                    this.photos.push(item)
                })
            }
        });
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
        if (this.sv.countryId) {
            this.prepareCitiesByCountry(this.sv.countryId);
        }
    }

    prepareCitiesByCountry(cntryId) {
        this.form.controls.cityId.setValue(null);
        this.dropDownServices.getAllCitiesForCountryDropDown(cntryId).subscribe((data: LocalSelectItem[]) => {
            this.cities = data;
        });
    }


    viewAttachment(photoDTO: PhotoDTO) {
        let dialogRef = this.dialog.open(AttImg64DialogComponent, {
            data: photoDTO,
            disableClose: true,
            width: '700px',
            direction: this.appSettings.settings.rtl ? 'rtl' : 'ltr',
        });
    }


    removeMasterPicFile(control: FormControl) {
        control.setValue(null);
    }


    close(): void {
        this.dialogRef.close();
    }

    approveRequest() {
        this.serviceSvMangment.acceptSvRequest(this.sv.id).subscribe(
            data => {
                this.messagesService.showInfoMessageLocal('GENERIC.server.success');
                this.dialogRef.close();
            },
            error => {
                this.messagesService.showErrorMessage(error.error.messageAr);
            }
        );
    }

    rejectRequest() {
        if (this.comments == null || this.comments.trim() == "") {
            this.messagesService.showErrorMessageLocal("validation.rejectReasonErr");
        } else {
            this.serviceSvMangment.rejectSvRequest(this.sv.id, this.comments).subscribe(
                data => {
                    this.messagesService.showInfoMessageLocal('GENERIC.server.success');
                    this.dialogRef.close();
                },
                error => {
                    this.messagesService.showErrorMessage(error.error.messageAr);
                }
            );
        }
    }


    public saveNewSv() {

        if (this.form.valid) {
            let masterPhoto: File = this.masterPicFileControl.value;
            let ownershipPhoto: File = this.ownerShipFileControl.value;
            this.form.disable();
            this.sv = this.form.value;
            console.log(this.sv)
            this.submitted = true;
            this.service.addVehicleWithAttachments(this.sv, masterPhoto, ownershipPhoto).subscribe(
                data => {
                    this.messagesService.showInfoMessageLocal('registration.submit.server.success');
                    this.dialogRef.close();
                },
                error => {
                    this.form.enable();
                    this.messagesService.showErrorMessage(error.error.messageAr);
                }
            );
            this.submitted = false;

        } else {
            this.messagesService.showErrorMessageLocal('registration.submit.not.valid.error');
        }
    }


}
