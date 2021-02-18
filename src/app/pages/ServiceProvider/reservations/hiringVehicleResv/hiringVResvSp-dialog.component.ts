import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {Router} from '@angular/router';


import {SvHiringReservation} from "../../../../models/DTO/SvHiringReservation";
import {UtilityController} from "../../../../appCommon/controllers/UtilityController";
import {LocalSelectItem} from "../../../../appCommon/models/dto/LocalSelectItem";
import {PhotoDTO} from "../../../../models/DTO/PhotoDTO";
import {AuthService} from "../../../../AuthModule/AuthService";
import {AppSettings} from "../../../../app.settings";
import {VehiclesService} from "../../../../services/sp/vehiclesService";
import {VehiclesServiceMangment} from "../../../../services/SvMangement/vehiclesServiceMangment";
import {MessagesService} from "../../../../appCommon/utility/MessagesService";
import {DropDownService} from "../../../../services/commonServices/drop-down-service.service";
import {AttImg64DialogComponent} from "../../../../appCommon/CustomeComponents/attachmentBase64Preview/att-img64-dialog.component";


@Component({
    selector: 'app-hiringResvSp-dialog',
    templateUrl: './hiringVResvSp-dialog.component.html',

})
export class HiringVResvSpDialogComponent extends UtilityController implements OnInit {
    public form: FormGroup;
    masterPicFileControl: FormControl;
    ownerShipFileControl: FormControl;
    public submitted: boolean;
    public photos: PhotoDTO[];
    displayedColumns: string[] = ['seq', 'type','price','vat','priceWithVat'];

    constructor(public dialogRef: MatDialogRef<HiringVResvSpDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public svHiringReservation: SvHiringReservation, public service: VehiclesService
                , public serviceSvMangment: VehiclesServiceMangment, public dialog: MatDialog,
                public fb: FormBuilder, private router: Router, public  messagesService: MessagesService,
                private dropDownServices: DropDownService, private authService: AuthService, public appSettings: AppSettings) {
        super();
        this.photos=[];
    }



    ngOnInit() {
        // this.getSvPhotos( );
    }




/*    getSvPhotos( ){
        this.serviceSvMangment.getSvPhotos(this.sv.id).subscribe((data: Array<PhotoDTO>) => {
            if (data) {
                data.forEach(item=>{
                    this.photos.push(item)
                })
            }
        } );
    }*/




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


/*    public saveNewSv() {

        if (this.form.valid) {
            let masterPhoto :File=this.masterPicFileControl.value;
            let ownershipPhoto :File=this.ownerShipFileControl.value;
            this.form.disable();
            this.sv=this.form.value;
            console.log(this.sv)
            this.submitted = true;
            this.service.addVehicleWithAttachments(this.sv,masterPhoto,ownershipPhoto).subscribe(
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
    }*/


}
