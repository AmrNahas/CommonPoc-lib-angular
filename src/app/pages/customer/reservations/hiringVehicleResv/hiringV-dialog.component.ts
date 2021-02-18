import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
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
    selector: 'app-hiringResvV-dialog',
    templateUrl: './hiringV-dialog.component.html',

})
export class HiringVDialogComponent extends UtilityController implements OnInit {
    // @ViewChild('content', {static: false}) content: ElementRef;
    @ViewChild('content') content:ElementRef;

    public form: FormGroup;
    masterPicFileControl: FormControl;
    ownerShipFileControl: FormControl;
    public submitted: boolean;
    public photos: PhotoDTO[];
    displayedColumns: string[] = ['seq', 'type','price','vat','priceWithVat'];

    constructor(public dialogRef: MatDialogRef<HiringVDialogComponent>,
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

    //
    //    downloadPDFx() {
    //
    //    //  let doc = new jsPDF('p','pt', 'a4');
    //     const specialElementHandlers = {
    //         '#editor': function (element, renderer) {
    //             return true;
    //         }
    //     };
    //
    //     const content = this.content.nativeElement;
    //
    //     doc.fromHTML(content.innerHTML, 15, 15, {
    //         width: 190,
    //         'elementHandlers': specialElementHandlers
    //     });
    //
    //     doc.save('test.pdf');
    // }

    // public downloadPDF():void {
    //     let DATA = this.content.nativeElement;
    //     let doc = new jsPDF('p','pt', 'a4');
    //     //
    //     // doc.addFont("test/reference/Amiri-Regular.ttf", "Amiri", "normal");
    //
    //     doc.setFont('Helvetica');
    //
    //
    //     let handleElement = {
    //         '#editor':function(element,renderer){
    //             return true;
    //         }
    //     };
    //     console.log(">>>doc : "+JSON.stringify(doc.getFontList()));
    //
    //     doc.html(document.getElementById('content'), {
    //         callback: function (doc) {
    //             doc.save()
    //         },
    //     })
    //
    //     /* doc.html(DATA.innerHTML,{x:5,y:15,filename:"fff" } );
    //
    //     doc.save('angular-demo.pdf');*/
    // }



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
