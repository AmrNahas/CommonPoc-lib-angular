import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DomSanitizer} from '@angular/platform-browser';


@Component({
    selector: 'app-agrement-preview-dialog',
    templateUrl: './agrement-dialog.component.html',
    styleUrls: ['./agrement-dialog.component.scss']

})
export class AgrementDialogComponent implements OnInit {
    public loading: boolean;


    constructor(public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public listOfAgreements: any, private sanitizer: DomSanitizer) {

    }

    ngOnInit() {
        this.loading = true;
        this.preview();
        this.loading = false;
    }

    close(): void {
        this.dialogRef.close();
    }



    preview() {


    }

}
